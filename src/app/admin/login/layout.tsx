// Login page layout — overrides parent admin layout's auth redirect
// by providing a passthrough layout for the login route only
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
