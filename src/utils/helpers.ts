export const formatRate = (float: string): string => {
  if (float.length > 21) return float.slice(0, 21)
  return float
}
