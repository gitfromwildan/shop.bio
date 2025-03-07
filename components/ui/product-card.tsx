'use client'

import * as React from "react"
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function ProductCard({ product }: { product: { image: string; name: string; description: string; price: number; link: string; id: number } }) {
  return (
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        </CardHeader>
        <CardContent className="py-2 px-6">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription className="min-h-[2.5rem] line-clamp-2 overflow-hidden text-ellipsis">{product.description}</CardDescription>
          <Badge className="my-4 bg-gray-700 text-white hover:bg-gray-600">
            Rp. {new Intl.NumberFormat('id-ID').format(product.price)}
          </Badge>
        </CardContent>
        <CardFooter>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-800 text-white">
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Button>
            </SheetTrigger>
            <SheetContent>
                <div className='my-8'>
                  <Image 
                  src={product.image}
                  alt={product.name} 
                  width={600}
                  height={450}
                  className="w-full aspect-[4/3] h-64 object-cover rounded-lg mb-4" />
                </div>
              <SheetHeader className="text-left">
                <SheetTitle>{product.name}</SheetTitle>
                <SheetDescription>{product.description}</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <div className="mt-4 w-full">
                  <p className="text-sm font-normal mb-2">Price : <span className="text-foreground font-bold">Rp. {new Intl.NumberFormat('id-ID').format(product.price)}</span></p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-800 text-white mt-8">
                    <Link href={product.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Checkout
                    </Link>
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardFooter>
      </Card>
    )
  }