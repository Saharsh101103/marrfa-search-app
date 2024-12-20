"use client";

import { useState, useEffect } from "react";
import { SearchBox } from "./SearchBox";
import { ResultsList } from "./ResultsList";
import { CategoryFilter } from "./CategoryFilter";
import { Pagination } from "./Pagination";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BlogPost } from "@/types";
import Link from "next/link";

const RESULTS_PER_PAGE = 12;

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<BlogPost[]>([]);
  const [suggestions, setSuggestions] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const payload = { query, category };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/get-blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error("Invalid response from API");
        }

        const filteredResults = data.payload.slice(
          (page - 1) * RESULTS_PER_PAGE,
          page * RESULTS_PER_PAGE
        );
        const suggestions = data.payload.map((post: BlogPost) => post.title);
        setSuggestions(suggestions);
        setResults(filteredResults);
        setTotalResults(data.payload.length);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
      }
    };

    fetchResults();
  }, [query, category, page]);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/get-blogs", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error("Invalid response from API");
      }

      const filteredResults = data.payload.slice(
        (page - 1) * RESULTS_PER_PAGE,
        page * RESULTS_PER_PAGE
      );
      const suggestions = data.payload.map((post: BlogPost) => post.title);
      setSuggestions(suggestions);
      setResults(filteredResults);
      setTotalResults(data.payload.length);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Blog Finder</h1>
          <h1 className="text-base font-normal mb-8 tracking-tighter text-muted-foreground">
            Search for blogs you want using the functions listed below.
          </h1>
        </div>
        <div>
          <Link href={"https://saharsh-raj.vercel.app"} target="_blank">
            <h2 className="text-base font-normal  tracking-tighter text-muted-foreground">
              By
            </h2>
            <h1 className="text-3xl font-bold ">Saharsh Raj</h1>
            <h3 className="text-base font-normal mb-8 tracking-tighter text-primary">
              Portfolio
            </h3>
          </Link>
        </div>
      </div>

      <SearchBox query={query} setQuery={setQuery} suggestions={suggestions} onSearch={fetchResults} />
      <div className="my-4">
        <CategoryFilter category={category} setCategory={setCategory} />
      </div>
      {results.length > 0 ? (
        <ResultsList results={results} query={query} />
      ) : query === "" ? (
        <div>
          <p className="text-xl text-primary">Try searching for keywords like:</p>
          
          <ul className="list-disc list-inside">
            <li>React</li>
            <li>Web development</li>
            <li>Java</li>
            <li>Node</li>
            <li>CSS</li>
            <li>API</li>
            <li>DevOps</li>
            <li>Kubernetes introduction</li>
            <li>Healthy</li>
            <li>Sustainable</li>
            <li>Minimalist home decor</li>
            <li>Organizing</li>
            <li>Digital</li>
            <li>Morning routine</li>
            <li>etc..</li>


          </ul>
        </div>
      ) : (
        <p>No Results Found</p>
      )}
      {!isMobile && results.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / RESULTS_PER_PAGE)}
          onPageChange={setPage}
        />
      )}
      {isMobile &&
        page * RESULTS_PER_PAGE < totalResults &&
        results.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="w-full mt-4 p-2 bg-primary text-primary-foreground rounded"
          >
            Load More
          </button>
        )}
    </div>
  );
}
