'use client'

import { useState, useEffect } from 'react'
import { SearchBox } from './SearchBox'
import { ResultsList } from './ResultsList'
import { CategoryFilter } from './CategoryFilter'
import { Pagination } from './Pagination'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BlogPost } from '@/types'

const RESULTS_PER_PAGE = 12

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<BlogPost[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const isMobile = useMediaQuery('(max-width: 640px)')
  // Fetch results whenever the query, category, or page changes
const payload = {query, category}

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/get-blogs", { method: "POST", body: JSON.stringify(payload)},);

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error("Invalid response from API");
        }

        // Filter based on query and category
        const filteredResults = data.payload.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE); // Pagination logic

        setResults(filteredResults);
        setTotalResults(data.payload.length); // Assuming total count is in the response
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]); // Clear results on error
      }
    };

    fetchResults();
  }, [query, category, page]);

  // Handle the load more button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Blog Finder</h1>
      <h1 className="text-base font-normal mb-8 tracking-tighter text-muted-foreground">Search for blogs you want using the functions listed below.</h1>
      <SearchBox query={query} setQuery={setQuery} />
      <div className="my-4">
        <CategoryFilter category={category} setCategory={setCategory} />
      </div>
      <ResultsList results={results} />
      {!isMobile && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / RESULTS_PER_PAGE)}
          onPageChange={setPage}
        />
      )}
      {isMobile && page * RESULTS_PER_PAGE < totalResults && (
        <button onClick={handleLoadMore} className="w-full mt-4 p-2 bg-primary text-primary-foreground rounded">
          Load More
        </button>
      )}
    </div>
  )
}
