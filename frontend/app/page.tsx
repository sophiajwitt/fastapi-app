"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [healthStatus, setHealthStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rootData, healthData] = await Promise.all([
          api.getRoot(),
          api.healthCheck(),
        ]);
        setMessage(rootData.message || "");
        setHealthStatus(healthData.status || "");
        setError(null);
      } catch (err) {
        setError("Failed to connect to API. Make sure the FastAPI backend is running on http://localhost:8000");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              FastAPI + Next.js
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A modern full-stack application
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                API Status
              </h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    {error}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Message
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {message}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Health Status
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {healthStatus}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h2>
              <div className="space-y-3">
                <Link
                  href="/items"
                  className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition-colors"
                >
                  Manage Items
                </Link>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md text-center transition-colors"
                >
                  API Documentation
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Getting Started
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Backend (FastAPI)
                </h3>
                <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm">
                  uvicorn main:app --reload
                </code>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend (Next.js)
                </h3>
                <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm">
                  cd frontend && npm run dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
