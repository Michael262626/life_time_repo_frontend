"use client"
import { Bell } from "lucide-react"
import { useState } from "react"

export default function DashboardHeader() {
  const [notifications] = useState(2)

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-end h-16 px-6 border-b">
      <div className="flex items-center">
        <div className="relative mr-4">
          <Bell className="w-6 h-6 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
              {notifications}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm font-medium">NA</span>
          </div>
          <span className="text-sm font-medium">Nike Ade</span>
        </div>
      </div>
    </header>
  )
}
