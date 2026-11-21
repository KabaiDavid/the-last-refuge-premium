import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "ink";

const styles: Record<Variant, string> = {
  primary:
    "bg-parchment text-ink hover:bg-amber border border-parchment hover:border-amber",
  outline:
    "border border-brass/70 text-parchment hover:bg-brass hover:text-ink hover:border-brass",
  ghost: "text-parchment border border-transparent hover:text-amber px-0!",
  ink: "bg-ink text-parchment border border-ink hover:bg-communion hover:border-communion",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Visually hidden suffix for links opening a third-party site. */
  external?: boolean;
  arrow?: boolean;
  "data-cta"?: string;
};

export function Button({ href, children, variant = "primary", className = "", external, arrow, ...rest }: Props) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 px-6 t-label transition-[background-color,color,border-color] duration-200 ease-exhale ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg aria-hidden width="18" height="10" viewBox="0 0 18 10" className="transition-transform duration-300 ease-exhale group-hover:translate-x-1">
          <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    const newTab = external ?? href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/** The one action that matters most. Always OpenTable, always the same words. */
export function ReserveButton({ variant = "primary", className = "", label = "Reserve a Table" }: { variant?: Variant; className?: string; label?: string }) {
  return (
    <Button href="/reservations" variant={variant} className={className} data-cta="reserve">
      {label}
    </Button>
  );
}
