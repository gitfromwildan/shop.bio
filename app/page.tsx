'use client'

import { useMemo, useState, useEffect, Key } from 'react';
import Link from 'next/link';
import { Moon, Sun, ExternalLink, BadgeCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductsData } from '@/data/product';
import { PROFILE } from "@/data/profile";
import { ProductCard } from '@/components/ui/product-card';
import Cookies from 'js-cookie';

function PageHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Fungsi untuk toggle dark mode
  const toggleDarkMode = (): void => {
    const DarkMode = !isDarkMode;
    setIsDarkMode(DarkMode);

    // Set dark mode class pada elemen HTML
    document.documentElement.classList.toggle('dark', DarkMode);

    // Simpan preferensi ke dalam cookie selama 7 hari
    Cookies.set('darkMode', DarkMode ? 'true' : 'false', { expires: 7 });
  };

  // Ambil preferensi dari cookie saat komponen dimount
  useEffect(() => {
    const darkModePreference = Cookies.get('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);
  
  interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    link: string;
  }
  
  const allProductsData = useMemo(() => {
    return Object.values(ProductsData).flat()
  }, [])

  const filteredProductsData = useMemo((): Product[] => {
    const ProductsDataToFilter =
      activeTab === "all"
        ? allProductsData
        : ProductsData[activeTab as keyof typeof ProductsData] || [];
  
    return ProductsDataToFilter.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm, allProductsData]);
  
  return (
    <div className={`min-h-screen Rp{isDarkMode ? 'dark' : ''}`}>
      <div className="container max-w-4xl mx-auto px-4 py-8 bg-background text-foreground relative">
        <header className="text-center mb-8">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
            <AvatarImage  alt={PROFILE.name} src={PROFILE.avatarUrl} />
            <AvatarFallback>{PROFILE.initials}</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">{PROFILE.name}</h1>
            <Badge className="ml-2 w-5 h-5 md:w-6 md:h-6 rounded-full p-0 flex items-center justify-center bg-blue-600">
              <BadgeCheck className="h-3 w-3 md:h-4 md:w-4 text-white" />
            </Badge>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-4 w-3/4 mx-auto">{PROFILE.description}</p>
        </header>

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <TabsList className="flex h-9 md:h-10 items-center justify-center  sm:inline-flex sm:justify-start rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="all" className="rounded-sm px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium transition-all hover:bg-background hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                All
              </TabsTrigger>
              {Object.keys(ProductsData).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="rounded-sm px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium transition-all hover:bg-background hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProductsData.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {filteredProductsData.length === 0 && (
              <p className="text-center text-muted-foreground">No Products found.</p>
            )}
          </TabsContent>
        </Tabs>

        <footer className="mt-32 text-center">
          <div className="mb-4 flex flex-nowrap justify-center gap-0">
            <Button variant="link" asChild className="text-sm md:text-base gap-0">
              <Link href={PROFILE.social.SocialOne.url} target="_blank" rel="noopener noreferrer">
              {PROFILE.social.SocialOne.name} <ExternalLink className="ml-1 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
            <Button variant="link" asChild className="text-sm md:text-base gap-0">
              <Link href={PROFILE.social.SocialTwo.url} target="_blank" rel="noopener noreferrer">
              {PROFILE.social.SocialTwo.name} <ExternalLink className="ml-1 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
            <Button variant="link" asChild className="text-sm md:text-base gap-0">
              <Link href={PROFILE.social.SocialThree.url} target="_blank" rel="noopener noreferrer">
              {PROFILE.social.SocialThree.name} <ExternalLink className="ml-1 h-3 w-3 md:h-4 md:w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className='font-bold'>{PROFILE.name}</span> - All rights reserved.
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="fixed top-4 sm:right-[5%] right-4 z-50 rounded-full w-8 h-8 md:w-10 md:h-10 bg-background border-primary">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </footer>
      </div>
    </div>
  )
}

export default PageHome;