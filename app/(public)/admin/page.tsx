export default function AdminPage() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Admin (Mock)</h1>
      <p className="mt-2 text-muted-foreground">RBAC, approvals, and analytics are out of scope for the demo.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium">Users</div>
          <div className="mt-2 h-24 rounded-md bg-secondary" />
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium">Tournaments</div>
          <div className="mt-2 h-24 rounded-md bg-secondary" />
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium">Revenue (Sample)</div>
          <div className="mt-2 h-24 rounded-md bg-secondary" />
        </div>
      </div>
    </section>
  )
}
