import Image from "next/image";
import Link from "next/link";

export function BrandLogo({
  priority = false,
  className = "",
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" aria-label="Nauka Motion — home" className={`nauka-brand-logo ${className}`}>
      <Image
        src="/logo-navbar-transparent.png"
        alt="Nauka Motion"
        width={768}
        height={265}
        priority={priority}
        className="nauka-brand-logo-image"
      />
    </Link>
  );
}
