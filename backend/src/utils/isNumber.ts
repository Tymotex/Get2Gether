// Note: this is just here to ensure unit tests work. Remove this whenever
export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
