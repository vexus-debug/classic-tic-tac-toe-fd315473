import { ReactNode, useEffect, useRef } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  lead: ReactNode;
  image?: string;
  imageAlt?: string;
  parallax?: boolean;
  actions?: ReactNode;
  aside?: ReactNode;
};

/** Prussian ink hero band. Optional background photo with GPU-only parallax. */
export function InkHero({ kicker, title, lead, image, imageAlt = "", parallax, actions, aside }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!parallax || !imgRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900) * 0.18;
        if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [parallax]);

  return (
    <section className="site-ink relative -mt-16 overflow-hidden pt-16">
      {image && (
        <div className="absolute inset-0" aria-hidden={!imageAlt}>
          <img
            ref={imgRef}
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover opacity-30 will-change-transform"
            style={{ transform: "translate3d(0,0,0) scale(1.08)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
      )}
      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {kicker && <p className="mb-6 font-mono text-xs tracking-wider text-primary">{kicker}</p>}
          <h1 className="text-balance text-4xl text-foreground md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">{lead}</p>
          {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}

export const inkBtn =
  "inline-flex h-12 items-center gap-2 rounded-sm bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const ghostBtn =
  "inline-flex h-12 items-center gap-2 rounded-sm border border-border px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary";
