export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow justify-center p-6 md:overflow-y-auto md:py-4">
      {children}
    </div>
  );
}
