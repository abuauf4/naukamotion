export function MotionSignalSection({ locale }: { locale: "id" | "en" }) {
  const copy = locale === "en"
    ? { label: "02 — The Nauka signal", small: "One shift can change the whole system.", end: "Built to move." }
    : { label: "02 — Sinyal Nauka", small: "Satu pergeseran bisa mengubah seluruh sistem.", end: "Dibuat untuk bergerak." };

  return (
    <section className="nauka-signal" aria-label={copy.label}>
      <div className="nauka-signal-grid" aria-hidden="true" />
      <div className="nauka-signal-content container-wide">
        <p className="nauka-signal-label">{copy.label}</p>
        <p className="nauka-signal-small">{copy.small}</p>
        <div className="nauka-signal-words" aria-hidden="true">
          <span className="nauka-signal-word nauka-signal-word-a">MOVE</span>
          <span className="nauka-signal-word nauka-signal-word-b">MOTION</span>
          <span className="nauka-signal-word nauka-signal-word-c">IMPACT</span>
        </div>
        <p className="nauka-signal-end">{copy.end} <span>↘</span></p>
      </div>
    </section>
  );
}
