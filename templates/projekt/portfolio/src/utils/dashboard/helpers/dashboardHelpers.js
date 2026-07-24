export function number(value) {
  return Number(value) || 0;
}

export function average(values = []) {
  if (!values.length) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) =>
      sum + number(value),
    0
  );

  return total / values.length;
}

export function round(
  value,
  decimals = 0
) {
  return Number(
    number(value).toFixed(decimals)
  );
}

export function sumInteractions(
  row
) {
  return (
    number(row.likes) +
    number(row.comments) +
    number(row.shares) +
    number(row.saves)
  );
}

export function sortByDate(
  items = []
) {
  return [...items].sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );
}