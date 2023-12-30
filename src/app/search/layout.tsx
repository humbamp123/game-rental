import SideNav from "@/features/search/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row-reverse md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow px-6 overflow-y-auto md:py-4">{children}</div>
    </div>
  );
}
