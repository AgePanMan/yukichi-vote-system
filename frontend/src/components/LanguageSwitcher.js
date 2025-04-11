import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select onChange={handleChange} value={i18n.language} className="border p-1 rounded">
      <option value="ja">日本語</option>
      <option value="en">English</option>
    </select>
  );
}
