import { getAdminSession } from '@/lib/admin-auth';
import { AdminNav } from '@/components/admin/AdminNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If not authenticated, render children without admin nav
  // (proxy handles redirect to /admin/login)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout-root">
      <AdminNav adminName={session.name} />
      <div className="admin-content">
        {children}
      </div>
      <style>{`
        .admin-layout-root {
          display: flex;
          background: var(--bg);
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }
        .admin-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .admin-layout-root {
            flex-direction: column;
          }
          .admin-content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
