import React from 'react';

export default function Roadmap() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🚀 開発ロードマップ</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-red-600 mb-2">High Priority</h3>
        <ul className="list-disc ml-6">
          <li>投票結果のCSVエクスポート</li>
          <li>グラフによる投票集計表示</li>
          <li>スマホ対応のレスポンシブ最適化</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-yellow-500 mb-2">Medium Priority</h3>
        <ul className="list-disc ml-6">
          <li>提案へのコメント機能</li>
          <li>提案スケジューリング（開始・終了予約）</li>
          <li>提案カレンダーUI（可視化）</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Low Priority</h3>
        <ul className="list-disc ml-6">
          <li>DAO参加者の一覧表示とCSV出力</li>
          <li>外部API連携（Chainlink 等）</li>
          <li>秘匿性を高めた匿名投票機能</li>
        </ul>
      </section>
    </div>
  );
}
