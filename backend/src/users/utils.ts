export const formatNumber = (value: number): string => {
    const num = Number(value);
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
}
   