import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AiAssistant from '@/components/ai-assistant';

const products = [
  {
    id: 1,
    name: 'Aether Frames',
    price: '$149.99',
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'stylish glasses',
  },
  {
    id: 2,
    name: 'Nova Spectacles',
    price: '$129.99',
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'modern eyewear',
  },
  {
    id: 3,
    name: 'Orion Optics',
    price: '$179.99',
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'classic glasses',
  },
  {
    id: 4,
    name: 'Helios Glasses',
    price: '$219.99',
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'luxury eyeglasses',
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Perfect Glasses for Your Face Shape',
    summary: 'A comprehensive guide to finding eyewear that complements your natural features.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'face shapes',
  },
  {
    id: 2,
    title: 'The Latest Trends in Optical Fashion for 2024',
    summary: 'Discover the styles that are making waves this year, from minimalist frames to bold colors.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fashion trend',
  },
  {
    id: 3,
    title: 'Caring for Your Eyewear: A Simple Guide',
    summary: 'Extend the life of your glasses with these easy-to-follow maintenance tips.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'glasses care',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative w-full py-24 md:py-32 lg:py-40 bg-card">
          <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                See the World, Differently.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                Discover our curated collection of premium eyewear, designed for the modern individual.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Button size="lg" asChild>
                  <a href="#featured-products">Shop Collection</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#ai-assistant">Find Your Style</a>
                </Button>
              </div>
            </div>
            <div className="relative h-full min-h-[300px] w-full">
               <Image
                src="https://placehold.co/800x600.png"
                alt="Stylish person wearing glasses"
                fill
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint="stylish person glasses"
              />
            </div>
          </div>
        </section>

        <section id="featured-products" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Featured Products</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Handpicked styles that blend quality craftsmanship with contemporary design.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="ai-assistant" className="w-full py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="overflow-hidden border-2">
              <div className="grid grid-cols-1 items-center md:grid-cols-2">
                <div className="relative h-64 w-full md:h-full">
                  <Image
                    src="https://placehold.co/600x600.png"
                    alt="AI Assistant"
                    fill
                    className="object-cover"
                    data-ai-hint="futuristic technology"
                  />
                </div>
                <div className="p-8 md:p-12 lg:p-16">
                  <Sparkles className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                    Find Your Perfect Frame with AI
                  </h3>
                  <p className="mt-4 text-muted-foreground md:text-lg">
                    Not sure what suits you? Our AI Style Assistant analyzes your facial features to recommend the best glasses for your unique look.
                  </p>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="lg" className="mt-6">Try It Now <ArrowRight className="ml-2 h-5 w-5" /></Button>
                    </SheetTrigger>
                    <SheetContent className="w-full max-w-full sm:max-w-lg overflow-y-auto">
                        <AiAssistant />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="blog" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">From Our Blog</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                Insights, trends, and advice from our team of optical experts.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.dataAiHint}
                    />
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.summary}</CardDescription>
                    <Button variant="link" className="mt-4 px-0">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
