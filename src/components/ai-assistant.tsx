"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Camera, Sparkles, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { runSuggestGlassesStyle } from '@/app/actions';
import type { SuggestGlassesStyleOutput } from '@/ai/flows/suggest-glasses-style';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

export default function AiAssistant() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestGlassesStyleOutput | null>(null);
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResult(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await runSuggestGlassesStyle(imagePreview);
      if (response.error) {
        throw new Error(response.error);
      }
      setResult(response.data);
    } catch (error) {
      console.error('Error getting style suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: (error as Error).message || 'Failed to get style suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="px-4 pt-4 sm:px-6">
        <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="h-6 w-6 text-accent" />
          AI Style Assistant
        </SheetTitle>
        <SheetDescription>
          Upload a clear, front-facing photo to get personalized frame recommendations.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-6">
          {!imagePreview && (
            <div className="relative flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-muted/25 transition-colors hover:border-accent">
              <UploadCloud className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="text-center text-muted-foreground">Drag & drop or click to upload</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Upload a photo"
              />
            </div>
          )}

          {imagePreview && (
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image src={imagePreview} alt="User photo preview" width={500} height={500} className="h-auto w-full object-contain" />
              <Button
                variant="destructive"
                size="icon"
                onClick={handleRemoveImage}
                className="absolute right-2 top-2 h-8 w-8 rounded-full"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={!imagePreview || isLoading} className="w-full" size="lg">
            {isLoading ? 'Analyzing...' : 'Get Recommendations'}
          </Button>

          {isLoading && <LoadingSkeleton />}
          
          {result && (
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-semibold">Your Style Results</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="mb-2 font-medium">Style Match Score</p>
                  <div className="flex items-center gap-4">
                    <Progress value={result.styleMatchScore * 100} className="h-3" />
                    <span className="font-bold text-primary">{Math.round(result.styleMatchScore * 100)}%</span>
                  </div>
                   <p className="text-xs text-muted-foreground mt-1">How well these styles match your features.</p>
                </CardContent>
              </Card>

              <div>
                <h4 className="mb-3 font-medium">Suggested Frame Styles</h4>
                <div className="grid grid-cols-2 gap-4">
                  {result.suggestedFrameStyles.map((style) => (
                    <Card key={style} className="flex flex-col items-center justify-center p-4 text-center">
                        <Glasses className="h-8 w-8 mb-2 text-muted-foreground"/>
                      <p className="font-semibold capitalize">{style}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6 pt-4">
            <h3 className="text-xl font-semibold">Analyzing your style...</h3>
            <Card>
                <CardContent className="p-4">
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-5 w-12" />
                    </div>
                </CardContent>
            </Card>

            <div>
                <Skeleton className="h-5 w-1/2 mb-3" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        </div>
    )
}
