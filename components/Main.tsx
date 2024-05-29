export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid flex-1 px-8 py-12">
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </main>
  )
}
