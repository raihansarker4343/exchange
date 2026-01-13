// src/services/mockApi.ts
// FULL REAL API WRAPPER (Auth + Admin)

const API_URL = "https://backend-lbxu.onrender.com";
/* =====================
   Helpers
===================== */
function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found. Please login again.");
  }
  return token;
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      message = data.error || data.message || message;
    } catch {
      message = await res.text();
    }
    throw new Error(message);
  }
  return res.json();
}

/* =====================
   API
===================== */
export const api = {
  /* ---------- AUTH ---------- */

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(res);
    localStorage.setItem("token", data.token);
    return data;
  },

  async register(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await handleResponse(res);
    localStorage.setItem("token", data.token);
    return data;
  },

  /* ---------- USER ---------- */

  async getUserTransactions() {
    const token = getToken();

    const res = await fetch(`${API_URL}/api/transactions/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return handleResponse(res);
  },

  async submitTransaction(payload: any) {
    const token = getToken();

    const res = await fetch(`${API_URL}/api/transactions/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return handleResponse(res);
  },

  async getRates() {
    const res = await fetch(`${API_URL}/api/config/rates`);
    return handleResponse(res);
  },

  async getMethods() {
    const res = await fetch(`${API_URL}/api/config/methods`);
    return handleResponse(res);
  },
  // 🔁 alias for backward compatibility
async getPaymentMethods() {
  return this.getMethods();
},


  /* ---------- ADMIN ---------- */

  async getAllTransactions() {
    const token = getToken();

    const res = await fetch(`${API_URL}/api/admin/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return handleResponse(res);
  },

  async updateTransactionStatus(
    id: string,
    status: string,
    note?: string
  ) {
    const token = getToken();

    const res = await fetch(
      `${API_URL}/api/admin/transactions/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, note }),
      }
    );

    return handleResponse(res);
  },

   // ✅ THIS WAS MISSING (AdminDashboard fix)
  async getStats() {
    const token = getToken();

    const res = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return handleResponse(res);
  },
};
