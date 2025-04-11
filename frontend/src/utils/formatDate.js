import i18n from '../i18n';

export function formatDate(dateStr) {
  const lang = i18n.language || 'ja';
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateStr));
}
