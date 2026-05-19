const feeCards = [
  { title: 'Collected', value: '₹9,30,000', style: 'bg-blue-50 dark:bg-blue-950/40' },
  { title: 'Pending', value: '₹2,70,000', style: 'bg-amber-50 dark:bg-amber-950/40' },
  { title: 'Transactions', value: '1,482', style: 'bg-emerald-50 dark:bg-emerald-950/40' },
];

export default function FeesPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Fees & Online Payments</h2>
        <p className="text-sm text-slate-500">Track fee collections, pending dues, and transaction throughput.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {feeCards.map((card) => (
          <div key={card.title} className={`rounded-xl p-4 ${card.style}`}>
            <div className="text-xs text-slate-500">{card.title}</div>
            <div className="mt-1 text-xl font-semibold">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
