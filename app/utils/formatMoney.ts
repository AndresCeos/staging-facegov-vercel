export default function formatMoney(amount: number): string {
  const formattedAmount: string = amount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    useGrouping: true,

  });
  return `${formattedAmount}`;
}
