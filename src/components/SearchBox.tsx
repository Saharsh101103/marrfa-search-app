'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

interface SearchBoxProps {
  query: string
  setQuery: (query: string) => void
}

export function SearchBox({ query, setQuery }: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setQuery])

  return (
    <Input
      type="search"
      placeholder="Search blog posts..."
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      className="w-full"
    />
  )
}

