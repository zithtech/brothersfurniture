import { useState } from 'react'
import { clientLogo, type Client } from '../data/clients'

/** Always shows full colour logo with graceful text fallback. */
export default function ClientLogo({ client, className = 'max-h-12' }: { client: Client; className?: string }) {
  const [hasError, setHasError] = useState(false)
  const src = clientLogo(client)

  if (hasError || !src) {
    return (
      <span className="font-semibold text-xs tracking-wider text-ink/70 uppercase text-center select-none">
        {client.name}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={client.name}
      title={client.name}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={`max-w-full object-contain mix-blend-multiply ${className}`}
    />
  )
}
