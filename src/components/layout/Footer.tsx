import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { Container } from "@/components/ui/Container";

/* Ícones sociais inline (sem lib de ícones): prata, hover azul claro. */
const socialIconClass =
  "text-silver transition-colors duration-300 hover:text-blue-light";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.9.529 3.68 1.447 5.198L2 22l4.938-1.412A9.947 9.947 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.19a8.17 8.17 0 0 1-4.3-1.222l-.309-.184-3.076.879.895-2.998-.202-.31A8.174 8.174 0 0 1 3.81 12c0-4.517 3.674-8.19 8.191-8.19S20.19 7.483 20.19 12s-3.674 8.19-8.189 8.19z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t bg-ink-950">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/nbmlogo-transparent.png"
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
            {/* redes sociais em ícone — prata, hover azul claro */}
            <div className="mt-2 flex items-center gap-5">
              {site.whatsapp && (
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp da NBM Consultoria"
                  className={socialIconClass}
                >
                  <WhatsAppIcon />
                </a>
              )}
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da NBM Consultoria"
                className={socialIconClass}
              >
                <LinkedInIcon />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da NBM Consultoria"
                className={socialIconClass}
              >
                <InstagramIcon />
              </a>
              {site.facebook && (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da NBM Consultoria"
                  className={socialIconClass}
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
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
