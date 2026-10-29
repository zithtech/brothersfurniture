import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Logo({ className = 'h-11' }: { className?: string }) {
  return (
    <Link to="/" aria-label="Brothers Furniture — home" className="shrink-0">
      <img src={logo} alt="Brothers Furniture — Inspiring Better Workspaces" className={`w-auto ${className}`} />
    </Link>
  )
}
