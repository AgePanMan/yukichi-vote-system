import i18n from '../i18n';

export function formatCurrency(amount, currency = 'JPY') {
  const lang = i18n.language || 'ja';
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency
  }).format(amount);
}
