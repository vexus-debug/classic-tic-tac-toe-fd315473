import { ReactNode, useEffect, useRef, useState } from "react";

export type Stage = {
  id: string;
  rail: string; // short label for the mobile pill rail
  title: string;
  body: ReactNode;
  points: string[];
  image: string;
  imageAlt: string;
};

/**
 * Desktop: sticky preview monitor on the left, numbered narrative on the right;
 * IntersectionObserver swaps the preview as each section enters view.
 * Mobile: sticky pill rail and inline 16:9 previews.
 */
export function StickyStage({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jump = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
  };

  return (
    <section className="border-y border-border">
      {/* Mobile pill rail */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 lg:hidden">
        <div className="container flex gap-1 overflow-x-auto py-2">
          {stages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jump(i)}
              className={`h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${active === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s.rail}
            </button>
          ))}
        </div>
      </div>

      <div className="container grid lg:grid-cols-2 lg:gap-16">
        {/* Sticky monitor */}
        <div className="hidden lg:block">
          <div className="sticky top-28 h-[580px] py-10">
            <div className="site-ink relative h-full overflow-hidden rounded-md border border-border">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
                <span>{String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
                <span className="text-primary">{stages[active].rail}</span>
              </div>
              {stages.map((s, i) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt={s.imageAlt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-x-0 bottom-0 top-10 h-[calc(100%-2.5rem)] w-full object-cover object-left-top transition-[opacity,transform] duration-500"
                  style={{ opacity: active === i ? 1 : 0, transform: `translate3d(0, ${active === i ? 0 : 12}px, 0)` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div>
          {stages.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              data-idx={i}
              ref={(el) => (refs.current[i] = el)}
              className="scroll-mt-32 border-b border-border py-14 last:border-b-0 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-20"
            >
              <span className={`font-mono text-sm transition-colors ${active === i ? "text-primary" : "text-muted-foreground"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-3xl text-foreground md:text-4xl">{s.title}</h2>
              <div className="mt-4 max-w-lg text-lg text-muted-foreground">{s.body}</div>
              <img src={s.image} alt={s.imageAlt} loading="lazy" className="mt-8 aspect-video w-full rounded-md border border-border object-cover object-left-top lg:hidden" />
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {s.points.map((p) => (
                  <li key={p} className="py-3 text-base text-foreground">{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
