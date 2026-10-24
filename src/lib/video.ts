/** Returns an embeddable iframe URL for YouTube / Vimeo links, or null for direct video files. */
export function videoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname.startsWith("/embed/")) return url;
      const id = u.searchParams.get("v") || u.pathname.match(/^\/(?:shorts|live)\/([^/]+)/)?.[1];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "vimeo.com") {
      const id = u.pathname.match(/^\/(\d+)/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "player.vimeo.com") return url;
  } catch {
    // relative URL (uploaded file)
  }
  return null;
}
