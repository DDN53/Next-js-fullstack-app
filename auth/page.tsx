"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormEvent, ChangeEvent } from "react";

export default function Form() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const { token } = await response.json();
      // Store token in local storage or cookie
      localStorage.setItem("jwt", token);
      router.push("/");
    } else {
      console.error("Login failed");
    }
  };
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout");
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit} // Attach the submit handler to the form
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded mt-4"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
