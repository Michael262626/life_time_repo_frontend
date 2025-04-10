"use client"
import Link from "next/link"
import { Home, User, Settings, HelpCircle, Mail } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-[240px] h-screen sticky top-0 border-r flex flex-col overflow-hidden bg-white">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-500">Lifetime</span>
        </Link>
      </div>

      <div className="flex flex-col flex-1 py-4">
        <Link href="/dashboard" className="flex items-center px-4 py-3 text-white bg-green-500 rounded-md mx-2">
          <Home className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link href="/profile" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md mx-2 mt-1">
          <User className="w-5 h-5 mr-3" />
          <span>Profile</span>
        </Link>
        <Link href="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md mx-2 mt-1">
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </Link>

        <div className="mt-auto">
          <div className="px-4 py-2 text-sm font-medium text-gray-700">Help & Support</div>
          <Link href="/faqs" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md mx-2">
            <HelpCircle className="w-5 h-5 mr-3" />
            <span>FAQs</span>
          </Link>
          <Link href="/contact" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md mx-2">
            <Mail className="w-5 h-5 mr-3" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
