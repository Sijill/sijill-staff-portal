export function normalizeTokenDigits(value, maxLength) {
  return value.replace(/\D/g, '').slice(0, maxLength).split('');
}

export function fillTokenArray(currentValues, value, startIndex, tokenLength) {
  const digits = normalizeTokenDigits(value, tokenLength - startIndex);
  const nextValues = [...currentValues];

  digits.forEach((digit, offset) => {
    nextValues[startIndex + offset] = digit;
  });

  return { nextValues, digits };
}
