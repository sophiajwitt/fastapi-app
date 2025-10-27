import { Item, ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
  async getRoot(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) throw new Error("Failed to fetch root");
    return response.json();
  },

  async getItem(itemId: number, q?: string): Promise<ApiResponse> {
    const url = new URL(`${API_BASE_URL}/items/${itemId}`);
    if (q) url.searchParams.append("q", q);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch item");
    return response.json();
  },

  async createItem(item: Item): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error("Failed to create item");
    return response.json();
  },

  async healthCheck(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error("Failed to check health");
    return response.json();
  },
};
