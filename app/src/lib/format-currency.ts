export function formatCurrency(
  price = 0,
  currency = "COP",
  locale = "es-CO",
  threeDecimals = false,
) {
  const currencyFormat = Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: threeDecimals ? 3 : 2,
    maximumFractionDigits: threeDecimals ? 3 : 2,
  });

  return currencyFormat.format(price && !Number.isNaN(price) ? price : 0);
}
