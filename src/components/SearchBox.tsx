'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'

interface SearchBoxProps {
  query: string
  setQuery: (query: string) => void
  suggestions: string[] // Array of suggestions passed as a prop
}

export function SearchBox({ query, setQuery, suggestions }: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState(query)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

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

  // Function to highlight the search term in a suggestion
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // 'gi' for case-insensitive search
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <span key={index} className='text-yellow-500 font-bold'>{part}</span>
        : part
    );
  };

  return (
    <div className="relative w-full">
      <Input
        type="search"
        placeholder="Search blog posts..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="w-full"
      />
      {localQuery && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10  border border-primary rounded-md mt-1 max-h-40 overflow-y-auto w-full shadow-lg backdrop-blur-3xl">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setLocalQuery(suggestion)
                setQuery(suggestion)
              }}
              className="px-4 py-2 cursor-pointer border-b border-muted hover:bg-primary text-primary-foreground"
            >
              {/* Highlight the search term in the suggestion */}
              {highlightSearchTerm(suggestion, localQuery)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
