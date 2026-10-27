import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/site/components/Layout";
import heroClinic from "@/assets/site/hero-clinic.jpg";
import heroDental from "@/assets/site/hero-dental.jpg";
import heroEye from "@/assets/site/hero-eye.jpg";
import { InkHero, inkBtn, ghostBtn } from "@/site/components/overhaul/InkHero";
import { Odontogram, RefractionDial } from "@/site/components/overhaul/ClinicalPreviews";

type Specialty = {
  code: string;
  title: string;
  group: "Outpatient" | "Diagnostic" | "Surgical";
  summary: string;
  pills: string[];
};

const specialties: Specialty[] = [
  {
    code: "SPEC-03",
    title: "General & Family Practice",
    group: "Outpatient",
    summary: "Walk-ins and booked visits side by side, with labs and prescriptions attached to the note.",
    pills: ["Triage", "E-prescriptions", "Chronic care plans"],
  },
  {
    code: "SPEC-04",
    title: "Pediatrics",
    group: "Outpatient",
    summary: "Immunisation schedules, growth tracking and parent reminders that fire on their own.",
    pills: ["Vaccine schedules", "Growth charts", "Family linking"],
  },
  {
    code: "SPEC-05",
    title: "Orthopedics & Physiotherapy",
    group: "Surgical",
    summary: "Long treatment cycles stay readable: every session, scan and progress note in sequence.",
    pills: ["Session plans", "Imaging compare", "Equipment log"],
  },
  {
    code: "SPEC-06",
    title: "Dermatology & Aesthetics",
    group: "Surgical",
    summary: "Before-and-after imagery, batch-tracked products and signed consent in the same record.",
    pills: ["Photo timeline", "Batch tracking", "E-signatures"],
  },
  {
    code: "SPEC-07",
    title: "Cardiology",
    group: "Diagnostic",
    summary: "ECG and echo results, refill alerts and risk-based follow-up for high-risk patients.",
    pills: ["ECG storage", "Refill alerts", "Risk follow-up"],
  },
  {
    code: "SPEC-08",
    title: "ENT",
    group: "Surgical",
    summary: "Audiometry, allergy schedules and procedure billing without spreadsheets on the side.",
    pills: ["Audiometry", "Pre/post-op", "Procedure billing"],
  },
  {
    code: "SPEC-09",
    title: "Neurology & Psychiatry",
    group: "Outpatient",
    summary: "Long-form notes, assessment scoring and tighter privacy controls for sensitive files.",
    pills: ["Long notes", "Assessment scoring", "Restricted access"],
  },
  {
    code: "SPEC-10",
    title: "Diagnostic & Lab Centers",
    group: "Diagnostic",
    summary: "Samples tracked from collection to delivery, with abnormal values flagged automatically.",
    pills: ["Barcode intake", "Critical flags", "Auto-delivery"],
  },
  {
    code: "SPEC-11",
    title: "Wellness & Integrative",
    group: "Outpatient",
    summary: "Custom modalities, package billing and retention campaigns for non-standard care.",
    pills: ["Custom modalities", "Package billing", "Retention"],
  },

const ledger = {
  shared: {
    label: "Shared Core",
    head: "Shared platform",
    rows: ["Staff roles and permissions", "Naira billing with split payments", "Patient records", "Audit log of every change", "Keeps working offline, syncs later"],
  },
  dental: {
    label: "Dental",
    head: "Dental module",
    rows: ["FDI / Universal tooth chart", "6-point perio probing", "Lab work slips", "30-day case cycle billing", "X-ray and image vault"],
  },
  eye: {
    label: "Eye Care",
    head: "Eye module",
    rows: ["Refraction Rx calculator", "Slit lamp notes", "Frame and lens stock", "Dispensing slips", "Contact lens fittings"],
  },
} as const;
type Col = keyof typeof ledger;
const cols: Col[] = ["shared", "dental", "eye"];

function ComparisonLedger() {
  const [col, setCol] = useState<Col>("shared");
  const touchX = useRef<number | null>(null);
  const onEnd = (x: number) => {
    if (touchX.current === null) return;
    const d = x - touchX.current;
    const i = cols.indexOf(col);
    if (Math.abs(d) > 40) setCol(cols[Math.max(0, Math.min(2, i + (d < 0 ? 1 : -1)))]);
    touchX.current = null;
  };
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="max-w-2xl text-3xl text-foreground md:text-4xl">One platform underneath. Two specialist modules on top.</h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">Every clinic gets the shared core. Dental and eye clinics add the tools their chairs and exam rooms need.</p>

        {/* Mobile segmented switch */}
        <div className="mt-10 grid grid-cols-3 rounded-full border border-border p-1 md:hidden" role="tablist">
          {cols.map((c) => (
            <button key={c} role="tab" aria-selected={col === c} onClick={() => setCol(c)}
              className={`h-11 rounded-full text-sm font-medium transition-colors ${col === c ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              {ledger[c].label}
            </button>
          ))}
        </div>
        <div className="mt-6 md:hidden" onTouchStart={(e) => (touchX.current = e.touches[0].clientX)} onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}>
          <p className="border-b border-foreground pb-3 font-mono text-xs text-muted-foreground">{ledger[col].head}</p>
          <ul className="divide-y divide-border">
            {ledger[col].rows.map((r, i) => (
              <li key={r} className="flex gap-4 py-4 text-base text-foreground"><span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>{r}</li>
            ))}
          </ul>
        </div>

        {/* Desktop table */}
        <table className="mt-14 hidden w-full border-collapse text-left md:table">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c} className={`border-b border-foreground pb-3 font-mono text-xs font-normal ${c === "shared" ? "text-foreground" : "text-muted-foreground"}`}>{ledger[c].head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ledger.shared.rows.map((_, i) => (
              <tr key={i} className="border-b border-border">
                {cols.map((c) => (
                  <td key={c} className="py-4 pr-6 align-top text-base text-foreground">{ledger[c].rows[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Directory() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="site-canvas-2 border-t border-border py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-3xl text-foreground md:text-4xl">Other specialties</h2>
          <p className="mt-4 text-lg text-muted-foreground">These run on the shared core today. Tap one to see how it fits.</p>
          <Link to="/contact" className="mt-8 inline-block text-sm font-semibold text-primary hover:underline">Ask about your specialty →</Link>
        </div>
        <ul className="border-t border-foreground lg:col-span-8">
          {specialties.map((s) => {
            const isOpen = open === s.code;
            return (
              <li key={s.code} className="border-b border-border">
                <button onClick={() => setOpen(isOpen ? null : s.code)} onMouseEnter={() => setOpen(s.code)} aria-expanded={isOpen}
                  className="grid min-h-[56px] w-full grid-cols-[72px_1fr_auto] items-center gap-4 py-4 text-left">
                  <span className="font-mono text-xs text-muted-foreground">{s.code}</span>
                  <span className={`text-lg transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>{s.title}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.group}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-5 pl-[88px] pr-4">
                      <p className="text-base text-muted-foreground">{s.summary}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-foreground">Shared core</span>
                        {s.pills.map((p) => <span key={p} className="font-mono text-[11px] text-muted-foreground">· {p}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Portal({ to, title, lead, tags, image, children, reverse }: { to: string; title: string; lead: string; tags: string[]; image: string; children: React.ReactNode; reverse?: boolean }) {
  return (
    <article className={`site-ink group relative grid overflow-hidden rounded-md border border-border lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative p-8 md:p-12">
        <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.12]" />
        <div className="relative">
          <h3 className="text-3xl text-foreground md:text-4xl">{title}</h3>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{lead}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-foreground">{t}</li>)}
          </ul>
          <Link to={to} className={`${inkBtn} mt-10`}>Explore {title.toLowerCase()} →</Link>
        </div>
      </div>
      <div className="border-t border-border bg-card p-8 md:p-12 lg:border-l lg:border-t-0">
        <p className="mb-6 font-mono text-xs text-muted-foreground">Live preview · try it</p>
        {children}
      </div>
    </article>
  );
}

const Industries = () => (
  <Layout>
    <InkHero
      parallax
      image={heroClinic}
      kicker="Industries"
      title={<>Software that works the way your specialty works.</>}
      lead="Clinexus is built deep for dental and eye clinics, with tooth charts, refraction and case billing designed with Nigerian practices. Everything else sits on the same shared core."
      actions={<>
        <Link to="/industries/dental-clinics" className={inkBtn}>Dental clinics</Link>
        <Link to="/industries/eye-clinics" className={ghostBtn}>Eye clinics</Link>
      </>}
    />

    <section className="py-20 md:py-28">
      <div className="container space-y-6">
        <Portal to="/industries/dental-clinics" title="Dental clinics" image={heroDental}
          lead="Tooth charting, perio probing and per-case billing built around how a busy chair actually runs."
          tags={["Perio charting", "30-day case billing", "X-ray vault"]}>
          <Odontogram />
        </Portal>
        <Portal reverse to="/industries/eye-clinics" title="Eye clinics" image={heroEye}
          lead="Refraction, prescriptions and the optical shop in one record, from exam room to collected glasses."
          tags={["Refraction Rx", "Lens dispensing", "Frame stock"]}>
          <RefractionDial />
        </Portal>
      </div>
    </section>

    <ComparisonLedger />
    <Directory />
  </Layout>
);

export default Industries;
