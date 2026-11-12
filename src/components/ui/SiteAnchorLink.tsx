"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";

/*
  Link para uma seção da home ("#sobre", "#faq"...). Na própria home
  continua sendo âncora pura (rolagem suave); em outras páginas — como
  /consorcios — vira "/#sobre", levando de volta à home na seção certa.
*/
export function useAnchorHref() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  return (href: string) => (!onHome && href.startsWith("#") ? `/${href}` : href);
}

export function SiteAnchorLink({ href, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const resolve = useAnchorHref();
  return <Link href={resolve(href)} {...rest} />;
}
