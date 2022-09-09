export const isSsr = (): boolean => typeof window === 'undefined' || typeof navigator === 'undefined';
