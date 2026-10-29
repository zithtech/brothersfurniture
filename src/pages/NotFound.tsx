import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6 lg:px-10">
      <p className="text-8xl font-semibold tracking-[0.18em]">404</p>
      <h1 className="mt-6 text-2xl font-medium">This page has moved desks.</h1>
      <Link to="/" className="mt-10 btn-outline">
        Back to home
      </Link>
    </div>
  )
}
