import React from 'react'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Outlet />
    </div>
  )
}

export default RootLayout