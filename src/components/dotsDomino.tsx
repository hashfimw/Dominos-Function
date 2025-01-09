interface DotsDominoProps {
  number: number;
}

const DotsDomino: React.FC<DotsDominoProps> = ({ number }) => {
  const generatePositions = (num: number): number[] => {
    const center = 5; // Pusat grid 3x3
    const positionsMap: Record<number, number[]> = {
      0: [],
      1: [center],
      2: [1, 9],
      3: [1, center, 9],
      4: [1, 3, 7, 9],
      5: [1, 3, center, 7, 9],
      6: [1, 3, 4, 6, 7, 9],
    };
    return positionsMap[num] || [];
  };

  const dotPositions = generatePositions(number);

  return (
    <div className="grid grid-cols-3 gap-1 w-10 h-10">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((pos) =>
        dotPositions.includes(pos) ? (
          <div
            key={pos}
            className="w-3 h-3 bg-red-500 rounded-full mx-auto"
          ></div>
        ) : (
          <div key={pos} className="w-2 h-2"></div>
        )
      )}
    </div>
  );
};

export default DotsDomino;
