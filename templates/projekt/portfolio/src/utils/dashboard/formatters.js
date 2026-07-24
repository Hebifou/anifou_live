// src/utils/dashboard/formatters.js

export function formatNumber(value) {
  if (
    typeof value === "string" &&
    isNaN(Number(value))
  ) {
    return value;
  }

  const number = Number(value);

  if (isNaN(number)) {
    return "0";
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 1,
    }
  );
}


export function formatPercentage(value) {
  const number = Number(value);

  if (isNaN(number)) {
    return "0%";
  }

  return `${number.toFixed(1)}%`;
}