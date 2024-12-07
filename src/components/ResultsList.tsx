import { BlogPost } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'



interface ResultsListProps {
  results: BlogPost[],
  query: string
}

export function ResultsList({ results, query }: ResultsListProps) {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
        <Card key={post.id} className=''>
          <CardHeader>
            <CardTitle>{highlightSearchTerm(post.title, query)}</CardTitle>
            <div className="text-sm text-muted-foreground mb-2">{post.category}</div>
            <div className='h-96 w-full relative rounded-xl'>
                <Image src={post.src+'?random='+post.id} alt={''} fill className='rounded-xl' priority loading='eager'/>
            </div>
            <CardDescription>{post.description}</CardDescription>
          </CardHeader>
        </Card>
        </Link>
      ))}
    </div>
  )
}


