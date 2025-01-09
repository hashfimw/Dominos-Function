export type Domino = [number, number];

// Show all domino cards
export const getDominoes = (source: Domino[]): Domino[] => source;

// Count double numbers
export const countDoubleNumbers = (source: Domino[]): number => {
  return source.filter(([a, b]) => a === b).length;
};

export const sortDominoes = (
  source: Domino[],
  order: "asc" | "desc"
): Domino[] => {
  return [...source].sort(([a1, b1], [a2, b2]) => {
    const sum1 = a1 + b1;
    const sum2 = a2 + b2;
    if (sum1 === sum2) {
      return order === "asc"
        ? Math.min(a1, b1) - Math.min(a2, b2)
        : Math.max(a2, b2) - Math.max(a1, b1);
    }
    return order === "asc" ? sum1 - sum2 : sum2 - sum1;
  });
};

export const removeDuplicates = (source: Domino[]): Domino[] => {
  const sumFrequency = new Map<number, number>();

  // Langkah 1: Hitung frekuensi total penjumlahan
  for (const [a, b] of source) {
    const sum = a + b;
    sumFrequency.set(sum, (sumFrequency.get(sum) || 0) + 1);
  }

  // Langkah 2: Hapus semua pasangan dengan penjumlahan yang muncul lebih dari sekali
  return source.filter(([a, b]) => sumFrequency.get(a + b) === 1);
};

export const flipDominoes = (source: Domino[]): Domino[] => {
  return source.map(([a, b]) => [b, a]);
};

export const removeByTotal = (source: Domino[], total: number): Domino[] => {
  return source.filter(([a, b]) => a + b !== total);
};

export const addDominoes = (
  source: Domino[],
  newDominoes: Domino[]
): Domino[] => {
  return [...source, ...newDominoes];
};
// Reset data
export const resetDominoes = (defaultData: Domino[]): Domino[] => defaultData;
