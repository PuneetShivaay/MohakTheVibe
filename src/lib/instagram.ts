// Build-time Instagram feed (static export: this runs during `next build`, never in the browser).
// Needs INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in the build environment; without them,
// or on any error, callers get null and show the local fallback images instead.

export type InstagramPost = {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  // Thumbnail for videos/reels, the image itself otherwise
  imageUrl: string;
  permalink: string;
  caption?: string;
};

type GraphMedia = {
  id: string;
  media_type: InstagramPost["mediaType"];
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";

export async function getInstagramPosts(limit = 6): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return null;

  try {
    const url = `https://graph.instagram.com/${userId}/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000), cache: "force-cache" });
    if (!res.ok) {
      // Log status only; never log the URL, it contains the token
      console.warn(`Instagram feed unavailable (HTTP ${res.status}); using fallback images.`);
      return null;
    }
    const json = (await res.json()) as { data?: GraphMedia[] };
    const posts = (json.data ?? [])
      .map((m) => ({
        id: m.id,
        mediaType: m.media_type,
        imageUrl: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
        permalink: m.permalink,
        caption: m.caption,
      }))
      .filter((p) => p.imageUrl);
    return posts.length > 0 ? posts.slice(0, limit) : null;
  } catch {
    console.warn("Instagram feed request failed; using fallback images.");
    return null;
  }
}
