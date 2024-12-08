'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'

interface SearchBoxProps {
  query: string
  setQuery: (query: string) => void
  suggestions: string[] // Array of suggestions passed as a prop
  onSearch: (query: string) => void // Callback to display results
}

export function SearchBox({ query, setQuery, suggestions, onSearch }: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState(query)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [isModalOpen, setModalOpen] = useState(true) // Manage modal visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery)
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(localQuery.toLowerCase())
        )
      )
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setQuery, suggestions])

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="text-yellow-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const handleOnchange= (e: ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value)
    setModalOpen(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery(localQuery)
      setFilteredSuggestions([]) // Close the suggestions list
      onSearch(localQuery) // Trigger the search results display
      setModalOpen(false) // Close the modal
    }
  }

  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="Search blog posts..."
        value={localQuery}
        onChange={(e) => handleOnchange(e)}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      {localQuery && filteredSuggestions.length > 0 && isModalOpen && (
        <ul className="absolute z-10 border border-primary rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg backdrop-blur-3xl">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setLocalQuery(suggestion)
                setQuery(suggestion)
                setFilteredSuggestions([]) // Close suggestions list
                onSearch(suggestion) // Trigger search
                setModalOpen(false) // Close the modal
              }}
              className="px-4 py-2 cursor-pointer border-b border-muted hover:bg-primary text-primary-foreground"
            >
              {highlightSearchTerm(suggestion, localQuery)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
