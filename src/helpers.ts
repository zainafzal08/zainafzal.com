export function toUrl(path: string) {
    return (new URL(path, import.meta.url)).href;
}