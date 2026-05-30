import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Access the nested array to match the JSON structure with a fallback
export const PlaceHolderImages: ImagePlaceholder[] = (data as any)?.placeholderImages || [];