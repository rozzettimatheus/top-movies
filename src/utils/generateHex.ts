export function generateHexFromFib(n: number) {
  const fibMemo: Record<number, number>  = {};
  const fibonacci = (num: number): number => {
    if (num in fibMemo) return fibMemo[num];
    if (num <= 1) return num;
    return (fibMemo[num] = fibonacci(num - 1) + fibonacci(num - 2));
  };
  const r = fibonacci(n) % 256;
  const g = fibonacci(n + 1) % 256;
  const b = fibonacci(n + 2) % 256;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function generateHexFroOddEvenColor(n: number) {
  const getOdd = (index: number) => 2 * index + 1;
  const getEven = (index: number) => 2 * index;
  const r = (n % 2 === 0 ? getEven(n) : getOdd(n)) % 256;
  const g = (n % 2 === 0 ? getEven(n + 1) : getOdd(n + 1)) % 256;
  const b = (n % 2 === 0 ? getEven(n + 2) : getOdd(n + 2)) % 256;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const hexAlgorithms = {
  fib: generateHexFromFib,
  oddEven: generateHexFroOddEvenColor
}