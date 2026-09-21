export const getItem = (key: string, fallback: boolean): boolean => {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return item === 'true';
}