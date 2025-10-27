"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Item } from "@/lib/types";

export default function ItemsPage() {
  const [itemId, setItemId] = useState("");
  const [query, setQuery] = useState("");
  const [fetchedItem, setFetchedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newItem, setNewItem] = useState<Item>({
    name: "",
    description: "",
    price: 0,
    tax: 0,
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleFetchItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId) return;

    setLoading(true);
    setError(null);
    setFetchedItem(null);

    try {
      const data = await api.getItem(parseInt(itemId), query || undefined);
      setFetchedItem(data);
    } catch (err) {
      setError("Failed to fetch item. Make sure the API is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreateSuccess(false);

    try {
      const data = await api.createItem(newItem);
      setCreateSuccess(true);
      setNewItem({
        name: "",
        description: "",
        price: 0,
        tax: 0,
      });
      console.log("Created item:", data);
    } catch (err) {
      setError("Failed to create item. Make sure the API is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Items Management
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Create and fetch items from the API
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Fetch Item
              </h2>
              <form onSubmit={handleFetchItem} className="space-y-4">
                <div>
                  <label
                    htmlFor="itemId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Item ID
                  </label>
                  <input
                    type="number"
                    id="itemId"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter item ID"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="query"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Query (optional)
                  </label>
                  <input
                    type="text"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter query parameter"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors"
                >
                  {loading ? "Fetching..." : "Fetch Item"}
                </button>
              </form>

              {fetchedItem && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Result:
                  </h3>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                    {JSON.stringify(fetchedItem, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Create Item
              </h2>
              <form onSubmit={handleCreateItem} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Item name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Item description"
                    rows={3}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tax"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Tax (optional)
                  </label>
                  <input
                    type="number"
                    id="tax"
                    step="0.01"
                    value={newItem.tax}
                    onChange={(e) =>
                      setNewItem({ ...newItem, tax: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md transition-colors"
                >
                  {loading ? "Creating..." : "Create Item"}
                </button>
              </form>

              {createSuccess && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Item created successfully!
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
