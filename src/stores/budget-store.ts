"use client";

// Single Zustand store for all server state (scaffold convention — no
// React Query, no SWR). Actions call the API envelope, then refresh the
// affected slice. call() is the only sanctioned JSON-ENVELOPE client.

import { create } from "zustand";
import type {
  BudgetWithSpent,
  DashboardData,
  ProfileUser,
  Result,
  Transaction,
  User,
} from "@/types";

interface ApiEnvelope<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

async function call<T>(path: string, init?: RequestInit): Promise<Result<T, string>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!res.ok || !body || body.ok === false) {
      const message =
        body && body.error ? body.error.message : `Request failed (${res.status})`;
      return { ok: false, error: message };
    }
    return { ok: true, data: body.data as T };
  } catch {
    return { ok: false, error: "Network error — check your connection and try again." };
  }
}

// The logout write-guard: logout() clears every slice, but hydrate()'s
// parallel fetches carried no generation token — a logout landing
// mid-fetch let stale resolutions re-populate the cleared slices (a
// cross-user flash on a fast logout → login). Every fetch captures this
// token at entry and may only write while it still matches; logout bumps
// it immediately before the clearing set.
let sessionWriteToken = 0;

export interface BudgetState {
  user: User | null;
  hydrated: boolean;
  loading: boolean;
  transactions: Transaction[];
  budgets: BudgetWithSpent[];
  dashboard: DashboardData | null;
  profile: ProfileUser | null;
  hydrate: () => Promise<void>;
  logout: () => void;
  fetchTransactions: () => Promise<void>;
  fetchBudgets: (month?: number, year?: number) => Promise<void>;
  fetchDashboard: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  addTransaction: (input: {
    type: "income" | "expense";
    amount: number;
    category: string;
    date: string;
    description?: string;
  }) => Promise<Result<Transaction, string>>;
  deleteTransaction: (id: string) => Promise<Result<{ id: string }, string>>;
  setBudget: (input: {
    category: string;
    monthlyLimit: number;
    month?: number;
    year?: number;
  }) => Promise<Result<BudgetWithSpent, string>>;
  deleteBudget: (id: string) => Promise<Result<{ id: string }, string>>;
  saveProfile: (input: {
    name: string;
    currency: string;
    aboutMe?: string;
    savingsGoal?: number | null;
  }) => Promise<Result<ProfileUser, string>>;
}

export const useBudgetStore = create<BudgetState>((set, get) => {
  /** Write only while the session token still matches (the logout guard). */
  const guarded = <T>(fn: () => Promise<T>): Promise<T> => {
    const token = sessionWriteToken;
    return fn().then((value) => {
      if (token === sessionWriteToken) return value;
      return undefined as unknown as T;
    });
  };

  const refreshAll = async () => {
    await Promise.allSettled([
      get().fetchTransactions(),
      get().fetchBudgets(),
      get().fetchDashboard(),
    ]);
  };

  return {
    user: null,
    hydrated: false,
    loading: false,
    transactions: [],
    budgets: [],
    dashboard: null,
    profile: null,

    hydrate: async () => {
      const res = await call<User>("/api/auth/me");
      if (res.ok && res.data) {
        set({ user: res.data, hydrated: true });
        await guarded(refreshAll);
      } else {
        set({ hydrated: true });
      }
    },

    logout: () => {
      sessionWriteToken += 1;
      set({
        user: null,
        hydrated: false,
        transactions: [],
        budgets: [],
        dashboard: null,
        profile: null,
      });
    },

    fetchTransactions: async () => {
      const res = await call<Transaction[]>("/api/transactions");
      if (res.ok) await guarded(() => Promise.resolve(set({ transactions: res.data })));
    },

    fetchBudgets: async (month?: number, year?: number) => {
      const params = new URLSearchParams();
      if (month) params.set("month", String(month));
      if (year) params.set("year", String(year));
      const qs = params.toString();
      const res = await call<BudgetWithSpent[]>(`/api/budgets${qs ? `?${qs}` : ""}`);
      if (res.ok) await guarded(() => Promise.resolve(set({ budgets: res.data })));
    },

    fetchDashboard: async () => {
      const res = await call<DashboardData>("/api/dashboard");
      if (res.ok) await guarded(() => Promise.resolve(set({ dashboard: res.data })));
    },

    fetchProfile: async () => {
      const res = await call<{ user: ProfileUser }>(
        "/api/profile",
      );
      if (res.ok) await guarded(() => Promise.resolve(set({ profile: res.data.user })));
    },

    addTransaction: async (input) => {
      const res = await call<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (res.ok) await guarded(refreshAll);
      return res;
    },

    deleteTransaction: async (id) => {
      const res = await call<{ id: string }>(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await guarded(refreshAll);
      return res;
    },

    setBudget: async (input) => {
      const res = await call<BudgetWithSpent>("/api/budgets", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (res.ok) await guarded(refreshAll);
      return res;
    },

    deleteBudget: async (id) => {
      const res = await call<{ id: string }>(`/api/budgets/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await guarded(refreshAll);
      return res;
    },

    saveProfile: async (input) => {
      const res = await call<ProfileUser>("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(input),
      });
      if (res.ok) {
        await guarded(async () => {
          set({ profile: res.data });
          await get().fetchDashboard();
        });
      }
      return res;
    },
  };
});
