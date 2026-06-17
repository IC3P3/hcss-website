/**
 * URL path under which uploaded media is served.
 * Must match the serving route at `src/routes/upload/[filename]/+server.ts`.
 */
export const MEDIA_URL_BASE = '/upload';

/**
 * Builds the public URL for an uploaded file from its stored filename.
 * Returns `null` for missing filenames so callers can fall back to a placeholder.
 */
export function mediaUrl(filename: string | null | undefined): string | null {
	return filename ? `${MEDIA_URL_BASE}/${encodeURIComponent(filename)}` : null;
}
