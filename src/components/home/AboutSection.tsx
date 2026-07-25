"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Sobre — perfil executivo (briefing). Blocos de experiência, formação,
  especialidades e certificações só aparecem se houver dado real em
  data/site.ts — nunca preenchidos com invenção.
*/
export function AboutSection() {
  const [imageMissing, setImageMissing] = useState(false);
  const { about, certifications } = site;

  return (
    <section id="sobre" className="hairline-light-t bg-paper-soft py-28 md:py-40">
      <Container className="grid gap-16 md:grid-cols-[0.85fr_1.15fr]">
        {/* foto executiva — /public/images/profile-about.webp */}
        <div className="shadow-paper relative aspect-[3/4] max-h-[620px] overflow-hidden rounded-2xl">
          {imageMissing ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-card-border via-paper-soft to-paper">
              <span className="eyebrow eyebrow-light">Retrato institucional</span>
              <span className="font-mono text-xs text-navy-text-soft/70">
                /public/images/profile-about.webp
              </span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.aboutImageSrc}
              alt={`Retrato de ${site.name}`}
              onError={() => setImageMissing(true)}
              className="h-full w-full object-cover"
              style={{ filter: "grayscale(0.4) contrast(1.08)" }}
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              boxShadow:
                "inset 0 0 0 1px color-mix(in srgb, var(--color-bg-primary) 8%, transparent)",
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--color-bg-primary) 35%, transparent), transparent 45%)",
            }}
          />
        </div>

        <div>
          <SectionLabel className="eyebrow-light">Sobre</SectionLabel>
          <h2 className="mt-8 text-3xl font-medium tracking-tight text-navy-text md:text-5xl">
            {site.name}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-bronze">
            {site.role}
          </p>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-navy-text-soft">
            {about.bio}
          </p>

          {about.experience.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow eyebrow-light">Experiência</p>
              <ul className="mt-4 flex flex-col gap-4">
                {about.experience.map((item) => (
                  <li key={`${item.period}-${item.title}`} className="hairline-light-b pb-4">
                    <span className="text-xs text-bronze">{item.period}</span>
                    <p className="mt-1 text-sm font-medium text-navy-text">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-sm text-navy-text-soft">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {about.education.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow eyebrow-light">Formação</p>
              <ul className="mt-4 flex flex-col gap-3">
                {about.education.map((item) => (
                  <li key={`${item.institution}-${item.course}`}>
                    <p className="text-sm font-medium text-navy-text">{item.course}</p>
                    <p className="text-sm text-navy-text-soft">{item.institution}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {about.specialties.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow eyebrow-light">Especialidades</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.specialties.map((item) => (
                  <span
                    key={item}
                    className="hairline-light rounded-full px-4 py-1.5 text-xs tracking-wide text-navy-text-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow eyebrow-light">Certificações</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert.label}
                    className="hairline-light rounded-full px-4 py-1.5 text-xs tracking-wide text-navy-text-soft"
                  >
                    {cert.label}
                    {cert.institution ? ` · ${cert.institution}` : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
