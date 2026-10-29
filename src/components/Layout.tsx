import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ContactFab from './ContactFab'
import Footer from './Footer'
import Navbar from './Navbar'
import PageLoader from './PageLoader'

export default function Layout() {
  const { pathname } = useLocation()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      {showLoader && <PageLoader onFinish={() => setShowLoader(false)} />}
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ContactFab />
    </div>
  )
}
