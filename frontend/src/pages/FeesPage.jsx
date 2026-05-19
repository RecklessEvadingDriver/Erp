export default function FeesPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-lg font-semibold">Fees & Online Payments</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-slate-800">
          <div className="text-xs text-slate-500">Collected</div>
          <div className="text-xl font-semibold">₹9,30,000</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-slate-800">
          <div className="text-xs text-slate-500">Pending</div>
          <div className="text-xl font-semibold">₹2,70,000</div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-slate-800">
          <div className="text-xs text-slate-500">Transactions</div>
          <div className="text-xl font-semibold">1,482</div>
        </div>
      </div>
    </div>
  );
}
