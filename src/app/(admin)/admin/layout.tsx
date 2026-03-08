import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
