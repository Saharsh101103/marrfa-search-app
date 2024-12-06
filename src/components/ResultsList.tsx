import { BlogPost } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'



interface ResultsListProps {
  results: BlogPost[]
}

export function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
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


