import { useState } from "react";
import { Link } from "react-router-dom";
import clinexusLogoWhite from "@/assets/site/clinexus-logo-white.png";

const columns = [
  { title: "Solutions", links: [
    { label: "Eye clinics", to: "/industries/eye-clinics" },
    { label: "Dental clinics", to: "/industries/dental-clinics" },
    { label: "Dental clinic pricing", to: "/industries/dental-clinics/pricing" },
    { label: "How a case works", to: "/industries/dental-clinics/how-cases-work" },
  ]},
  { title: "Resources", links: [
    { label: "Tutorials", to: "/tutorials" },
    { label: "Articles", to: "/articles" },
    { label: "Updates", to: "/updates" },
    { label: "All industries", to: "/industries" },
  ]},
  { title: "Company", links: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Log in", to: "/login" },
  ]},
  { title: "Legal", links: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookies" },
  ]},
];

const linkCls = "text-sm text-muted-foreground transition-colors hover:text-primary";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="site-footer site-ink relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsl(var(--ink-glow)), transparent)" }}
      />
      <div className="container relative">
        <div className="grid gap-6 border-b border-border py-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="font-mono text-xs text-primary">Clinical dispatch</p>
            <h3 className="mt-2 text-2xl text-foreground">Product updates and practical clinic notes.</h3>
            <p className="mt-2 text-sm text-muted-foreground">About one email a month. Unsubscribe any time.</p>
          </div>
          {done ? (
            <p className="text-sm font-medium text-primary md:justify-self-end">Thanks, you're on the list.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
              className="flex w-full border-b border-border focus-within:border-primary md:max-w-md md:justify-self-end"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@clinic.com.ng"
                className="h-12 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="h-12 px-2 text-sm font-semibold text-primary hover:opacity-80">
                Subscribe →
              </button>
            </form>
          )}
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-6">
          <div className="space-y-5 lg:col-span-2">
            <img src={clinexusLogoWhite} alt="Clinexus" className="h-9" />
            <p className="max-w-xs text-sm text-muted-foreground">
              Clinic software for Nigerian dental and eye practices.
            </p>
            <div className="space-y-1.5 text-sm">
              <a href="mailto:support@clinexus.com.ng" className={`block ${linkCls}`}>support@clinexus.com.ng</a>
              <a href="https://wa.me/2349017758165" target="_blank" rel="noopener noreferrer" className={`block ${linkCls}`}>0901 7758 165</a>
              <span className="block text-sm text-muted-foreground">Ikeja, Lagos</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 border-b border-border pb-2 font-mono text-xs text-foreground">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      {l.to === "/login" ? (
                        <a href={l.to} className={linkCls}>{l.label}</a>
                      ) : (
                        <Link to={l.to} className={linkCls}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Clinexus</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--signal-emerald))]" />
            All systems operational · Lagos/WAT
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
