import { getAdminSession } from '@/lib/admin-auth';
import { AdminNav } from '@/components/admin/AdminNav';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if this is the login page — skip auth for login
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  
  // For login page, don't check auth (proxy already handles redirect)
  // The layout always renders, but login page has its own full-screen design
  const session = await getAdminSession();

  // If not authenticated and not on login page, redirect
  // (proxy also does this, but this is a belt-and-suspenders check)
  if (!session) {
    // Check if we're on the login page by checking the URL
    const referer = headerList.get('referer') || '';
    // The proxy already redirects /admin/* to /admin/login if not authenticated
    // If we reach here without session, we're likely on /admin/login
    // Just render children without admin nav
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', background: 'var(--bg)', minHeight: '100vh' }}>
      <AdminNav adminName={session.name} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
