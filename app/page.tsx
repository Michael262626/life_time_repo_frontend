"use client"

import { Toaster } from "@/components/ui/toaster"
import Dashboard from "./dashboard"

export default function Page() {
  return (
    <>
      <Dashboard />
      <Toaster />
    </>
  )
}
