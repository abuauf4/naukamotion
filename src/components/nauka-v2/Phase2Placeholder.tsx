/**
 * Phase2Placeholder — minimal section used for Phase 2+ sections
 * (Selected Work, Studio, About, Contact) until they are redesigned.
 *
 * V2 design principle: a placeholder should look intentional, not
 * like a "coming soon" stub. Type + spacing + thin rule is enough.
 * The user explicitly said the redesign must not look like an
 * abandoned site — these placeholders must read as deliberate.
 *
 * No "Phase 2" notice is rendered to the user. The label + heading
 * establish the section anchor; the rest of the section is intentionally
 * empty whitespace (a deliberate design choice, not a missing feature).
 *
 * Server component (no client island needed).
 */
export function Phase2Placeholder({
  label,
  heading,
}: {
  label: string;
  heading: string;
}) {
  return (
    <section
      style={{
        paddingTop: "clamp(80px, 14vw, 160px)",
        paddingBottom: "clamp(80px, 14vw, 160px)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 400,
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            margin: "0 0 24px 0",
          }}
        >
          {label}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          {heading}
        </h2>
      </div>
    </section>
  );
}

