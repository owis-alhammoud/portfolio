export function toCorsUrl(url: string): string {
  const prefix = 'https://aoueesah.pythonanywhere.com/media/';
  const corsPrefix = 'https://aoueesah.pythonanywhere.com/api/media-cors/';
  return url.startsWith(prefix) ? url.replace(prefix, corsPrefix) : url;
}
export function fromCorsUrl(url: string): string {
  const prefix = 'https://aoueesah.pythonanywhere.com/media/';
  const corsPrefix = 'https://aoueesah.pythonanywhere.com/api/media-cors/';
  return url.startsWith(corsPrefix) ? url.replace(corsPrefix, prefix) : url;
}