import { useState } from "react";

// FDI numbering, upper right→left then lower left→right.
const UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
type ToothState = "healthy" | "treated" | "caries" | "missing";
const CYCLE: ToothState[] = ["healthy", "caries", "treated", "missing"];
const initial: Record<number, ToothState> = { 16: "treated", 26: "caries", 36: "treated", 47: "missing", 11: "treated" };

const fill: Record<ToothState, string> = {
  healthy: "fill-muted stroke-border",
  treated: "fill-primary/70 stroke-primary",
  caries: "fill-[hsl(var(--signal-amber))] stroke-[hsl(var(--signal-amber))]",
  missing: "fill-transparent stroke-border [stroke-dasharray:2_2]",
};

/** Interactive 32-tooth FDI odontogram. Tap a tooth to cycle its state. */
export function Odontogram({ compact = false }: { compact?: boolean }) {
  const [teeth, setTeeth] = useState(initial);
  const [last, setLast] = useState<number | null>(26);
  const tap = (n: number) => {
    const cur = teeth[n] ?? "healthy";
    setTeeth({ ...teeth, [n]: CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length] });
    setLast(n);
  };
  const row = (nums: number[], y: number) =>
    nums.map((n, i) => (
      <g key={n} onClick={() => tap(n)} className="cursor-pointer" role="button" aria-label={`Tooth ${n}: ${teeth[n] ?? "healthy"}`}>
        <rect x={4 + i * 20 + (i >= 8 ? 6 : 0)} y={y} width="16" height="22" rx="3" strokeWidth="1" className={`${fill[teeth[n] ?? "healthy"]} transition-colors`} />
        {!compact && (
          <text x={12 + i * 20 + (i >= 8 ? 6 : 0)} y={y === 4 ? 40 : y - 6} textAnchor="middle" className="fill-muted-foreground font-mono text-[6px]">
            {n}
          </text>
        )}
      </g>
    ));
  return (
    <div>
      <svg viewBox="0 0 334 82" className="w-full" aria-label="Tooth chart">
        {row(UPPER, 4)}
        <line x1="4" x2="330" y1="47" y2="47" className="stroke-border" strokeWidth="0.5" />
        {row(LOWER, 56)}
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-primary/70" /> Treated</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] bg-[hsl(var(--signal-amber))]" /> Caries</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-[2px] border border-dashed border-border" /> Missing</span>
        {last && <span className="ml-auto text-foreground">#{last} · {teeth[last] ?? "healthy"}</span>}
      </div>
    </div>
  );
}

/** Refraction readout with an axis dial. Drag the slider to rotate the axis. */
export function RefractionDial() {
  const [axis, setAxis] = useState(90);
  const [eye, setEye] = useState<"OD" | "OS">("OD");
  const rx = eye === "OD" ? { sph: "-2.25", cyl: "-0.75" } : { sph: "-1.75", cyl: "-0.50" };
  const rad = ((180 - axis) * Math.PI) / 180;
  return (
    <div className="grid grid-cols-[96px_1fr] items-center gap-5">
      <svg viewBox="0 0 100 100" className="w-24" aria-label={`Axis ${axis} degrees`}>
        <circle cx="50" cy="50" r="44" className="fill-none stroke-border" strokeWidth="1" />
        {[0, 30, 60, 90, 120, 150].map((d) => {
          const r = (d * Math.PI) / 180;
          return <line key={d} x1={50 + 40 * Math.cos(r)} y1={50 - 40 * Math.sin(r)} x2={50 + 44 * Math.cos(r)} y2={50 - 44 * Math.sin(r)} className="stroke-muted-foreground" strokeWidth="1" />;
        })}
        <line x1={50 - 38 * Math.cos(rad)} y1={50 + 38 * Math.sin(rad)} x2={50 + 38 * Math.cos(rad)} y2={50 - 38 * Math.sin(rad)} className="stroke-primary transition-all" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" className="fill-primary" />
      </svg>
      <div>
        <div className="mb-3 inline-flex rounded-sm border border-border p-0.5 font-mono text-[11px]">
          {(["OD", "OS"] as const).map((e) => (
            <button key={e} onClick={() => setEye(e)} className={`rounded-[2px] px-2.5 py-1 ${eye === e ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{e}</button>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-2 font-mono text-sm tabular-nums">
          <div><dt className="text-[10px] text-muted-foreground">SPH</dt><dd className="text-foreground">{rx.sph}</dd></div>
          <div><dt className="text-[10px] text-muted-foreground">CYL</dt><dd className="text-foreground">{rx.cyl}</dd></div>
          <div><dt className="text-[10px] text-muted-foreground">AXIS</dt><dd className="text-primary">{String(axis).padStart(3, "0")}°</dd></div>
        </dl>
        <input type="range" min={0} max={180} value={axis} onChange={(e) => setAxis(+e.target.value)} aria-label="Axis" className="mt-3 w-full accent-[hsl(var(--primary))]" />
      </div>
    </div>
  );
}
