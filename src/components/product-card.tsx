import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  dataAiHint: string;
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-2 shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <div className="p-4">
          <h3 className="font-headline text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 text-base text-muted-foreground">{product.price}</p>
          <Button className="mt-4 w-full" variant="outline">
            View Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
