"use client"

import { useLogoutMutation } from "@/store/features/auth/authApi"
import { logout } from "@/store/features/user/userSlice"
import { useDispatch } from "react-redux"

export default function LogoutButton() {
  const [logoutApi, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
      dispatch(logout())
    } catch (err) {
      // Even if the API call fails, we still want to log out locally
      dispatch(logout())
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  )
}

