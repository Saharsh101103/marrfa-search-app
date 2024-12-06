'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogPost as BlogPostType } from '@/types'
import { LayoutGrid } from './ui/layout-grid'

interface BlogPostProps {
  id: string
}

export function BlogPost(params: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      
      try {
        const response = await fetch(`/api/get-blogs?id=${params.id}`, { method: "GET"});

        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await response.json();
        console.log(data)

        const mockPost: BlogPostType = data.payload

        if (data.status !== 200) {
          throw new Error("Invalid response from API");
        }

        setPost(mockPost)
      } catch (error) {
        console.error("Error fetching results:", error);
        setPost(null); // Clear results on error
      }
      
    }

    fetchPost()
  }, [params.id])
  console.log("POST , ->", post)

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground">{post.category}</div>
        </CardHeader>
        <CardContent>
        <div className="h-screen py w-full">
        <LayoutGrid cards={cards} />
        </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>
    </div>
  )
}

const SkeletonOne = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House in the woods
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A serene and tranquil retreat, this house in the woods offers a peaceful
          escape from the hustle and bustle of city life.
        </p>
      </div>
    );
  };
   
  const SkeletonTwo = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          House above the clouds
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Perched high above the world, this house offers breathtaking views and a
          unique living experience. It&apos;s a place where the sky meets home,
          and tranquility is a way of life.
        </p>
      </div>
    );
  };
  const SkeletonThree = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Greens all over
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };
  const SkeletonFour = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Rivers are serene
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          A house by the river is a place of peace and tranquility. It&apos;s the
          perfect place to relax, unwind, and enjoy life.
        </p>
      </div>
    );
  };

const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "md:col-span-2",
      thumbnail:
        `https://picsum.photos/1080/1920?random=${Math.random()*10}`,
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail:
        `https://picsum.photos/1080/1920?random=${Math.random()*10}`,
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail:
        `https://picsum.photos/1080/1920?random=${Math.random()*10}`,
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "md:col-span-2",
      thumbnail:
        `https://picsum.photos/1080/1920?random=${Math.random()*10}`,
    },
  ];

