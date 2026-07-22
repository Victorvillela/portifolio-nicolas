import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="hairline-t bg-ink-950">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/nbmlogo.png"
                alt={site.brandMark}
                width={150}
                height={150}
                className="h-8 w-8 object-contain"
              />
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-fog">
                {site.brandMark}
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              {site.role}. {site.xpDisclosure}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Navegação</p>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-ash transition-colors hover:text-fog"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Contato</p>
            <a
              href={`mailto:${site.email}`}
              className="w-fit text-sm text-ash transition-colors hover:text-fog"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-ash transition-colors hover:text-fog"
            >
              LinkedIn
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-ash transition-colors hover:text-fog"
            >
              Instagram
            </a>
            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-ash transition-colors hover:text-fog"
              >
                Facebook
              </a>
            )}
            {site.whatsapp && (
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm text-ash transition-colors hover:text-fog"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className="hairline-t mt-14 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-ash/70">
            {site.legalDisclaimer}
          </p>
          <p className="mt-6 text-xs text-ash/50">
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
