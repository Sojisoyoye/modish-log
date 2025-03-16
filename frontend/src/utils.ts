export const formatNumber = (value: number): string => {
  const num = Number(value);
  // Check if the decimal part is 0
  if (num % 1 === 0) {
    return num.toFixed(0); // Display as integer
  } else {
    return num.toString(); // Display full decimal value
  }
};
