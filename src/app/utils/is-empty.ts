export const isEmpty = <T>(obj: object | unknown[] | null | undefined | T): boolean => {
  if (obj == null) return true; // Handles null and undefined
  return (typeof obj === 'object' || Array.isArray(obj)) && !Object.entries(obj).length;
};
