import SideNav from '@/features/checkout/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row-reverse md:overflow-hidden">
      <div className="w-full flex-none md:w-64 md:pb-4">
        <SideNav />
      </div>
      <div className="flex justify-center flex-grow overflow-y-auto py-4 px-6">{children}</div>
    </div>
  );
}
