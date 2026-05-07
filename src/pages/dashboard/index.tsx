export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome to your UI Codebase template.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-neutral-800">Components</h3>
          <p className="text-neutral-500 text-sm mt-2">Browse the robust set of pre-built UI components.</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-neutral-800">Layout</h3>
          <p className="text-neutral-500 text-sm mt-2">Responsive layout with sidebar navigation built-in.</p>
        </div>
      </div>
    </div>
  );
}
