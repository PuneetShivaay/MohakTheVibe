// Image URL helpers shared by the build-time catalog and client components (no heavy imports here).

export const isCloudinaryUrl = (url: string) => /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(url);

// Marketplace CDNs that host the same product photos (Flipkart: rukminim1/2.flixcart.com, Meesho)
export const isMarketplaceImage = (url: string) =>
  /^https:\/\/(rukminim\d*\.flixcart\.com|images\.meesho\.com)\//.test(url);

export const isAllowedImage = (url: string) => isCloudinaryUrl(url) || isMarketplaceImage(url);

// Adds automatic format/quality and a width cap to Cloudinary URLs (Next image optimisation is
// off in static export). Other URLs are returned unchanged.
export function cloudinaryUrl(url: string, width = 800) {
  if (!isCloudinaryUrl(url)) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
}
