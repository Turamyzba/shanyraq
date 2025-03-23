"use client"

import type React from "react"

import { useState } from "react"
import { useVerifyEmailMutation } from "@/store/features/auth/authApi"
import type { VerifyEmailRequest } from "@/types/request/authRequests"

export default function VerifyEmailForm({ email }: { email: string }) {
  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation()
  const [formData, setFormData] = useState<VerifyEmailRequest>({
    email,
    code: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await verifyEmail(formData).unwrap()
      // Redirect to login page or show success message
    } catch (err) {
      // Error handling done by notification middleware
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          required
          value={formData.code}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {(error as any)?.data?.message || "An error occurred during verification"}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </button>
    </form>
  )
}

