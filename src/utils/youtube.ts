/**
 * Helper to extract YouTube Video ID, Vimeo IDs, and manage embeds
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Vimeo URLs
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern 1: youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // Pattern 2: youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Pattern 3: youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Pattern 4: youtube.com/embed/<id>
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Fallback: If user directly entered the 11 character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
  return match && match[3] ? match[3] : null;
}

export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' = 'hq'): string {
  if (!videoId) return '';
  if (quality === 'maxres') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  if (!videoId) return '';
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`;
}

export function getVideoEmbedUrl(
  video: { youtubeId?: string; youtubeUrl?: string; provider?: 'youtube' | 'vimeo' | 'custom' },
  autoplay = true
): string {
  const provider = video.provider || 'youtube';

  if (provider === 'youtube' && video.youtubeId) {
    return getYouTubeEmbedUrl(video.youtubeId, autoplay);
  }

  if (provider === 'vimeo' && video.youtubeUrl) {
    const vimeoId = extractVimeoId(video.youtubeUrl);
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&dnt=1`;
    }
  }

  // Fallback or custom iframe/video
  if (video.youtubeId) {
    return getYouTubeEmbedUrl(video.youtubeId, autoplay);
  }

  return video.youtubeUrl || '';
}
