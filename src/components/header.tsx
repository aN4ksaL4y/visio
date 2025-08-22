"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Glasses, Menu, Sparkles, X } from 'lucide-react';
import AiAssistant from './ai-assistant';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Belanja', href: '#featured-products' },
  { name: 'Koleksi', href: '#' },
  { name: 'Blog', href: '#blog' },
  { name: 'Tentang', href: '#' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <Glasses className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-semibold">VisioStyle Optics</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span className='hidden sm:inline'>AI Asisten Gaya</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-full sm:max-w-lg overflow-y-auto">
                    <AiAssistant />
                </SheetContent>
            </Sheet>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
