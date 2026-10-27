import type { Metadata } from "next";
import { PreviewHome } from "./PreviewHome";

// Temporary design preview for the "Quiet Heritage" redesign. Delete this folder when done.
export const metadata: Metadata = {
  title: "Design Preview | Mohak – The Vibe",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <PreviewHome />;
}
