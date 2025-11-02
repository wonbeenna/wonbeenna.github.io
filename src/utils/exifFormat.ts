export const formatAperture = (apex?: number): string | undefined => {
  if (!apex) {
    return '0';
  }

  const fNumber = Math.pow(2, apex / 2);
  return `f/${fNumber.toFixed(1)}`;
};

export const formatShutterSpeed = (apex?: number): string | undefined => {
  if (!apex) {
    return '0';
  }

  const sec = 1 / Math.pow(2, apex);
  if (sec >= 1) {
    return `${sec.toFixed(1)}s`;
  }

  const denom = Math.round(1 / sec);
  return `1/${denom}s`;
};
