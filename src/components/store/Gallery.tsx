import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

type Img = { readonly url: string; readonly alt: string };

export function Gallery({ images }: { images: readonly Img[] }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const trackRef = useRef<HTMLDivElement>(null);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };

  return (
    <div className="flex gap-4">
      {/* Miniaturas verticais (desktop) */}
      <div className="hidden w-16 shrink-0 flex-col gap-3 md:flex">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onMouseEnter={() => setIndex(i)}
            onClick={() => setIndex(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              "overflow-hidden rounded-lg border bg-card p-1 transition-all",
              i === index
                ? "border-primary ring-2 ring-primary/25"
                : "border-border hover:border-primary/50",
            )}
          >
            <img src={img.url} alt={img.alt} className="aspect-square w-full object-contain" />
          </button>
        ))}
      </div>

      {/* Imagem principal (desktop) */}
      <div className="relative hidden flex-1 md:block">
        <div
          className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMove}
        >
          <img
            src={images[index]?.url}
            alt={images[index]?.alt}
            className={cn(
              "size-full object-contain transition-transform duration-200",
              zoom ? "scale-[1.9]" : "scale-100",
            )}
            style={{ transformOrigin: origin }}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-foreground/70 px-3 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
            <Expand className="size-3" /> Passe o mouse para ampliar
          </span>
        </div>
        {images.length > 1 && (
          <>
            <NavBtn side="left" onClick={() => go(-1)} />
            <NavBtn side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* Carrossel swipe (mobile) */}
      <div className="w-full md:hidden">
        <div
          ref={trackRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-border bg-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img) => (
            <img
              key={img.url}
              src={img.url}
              alt={img.alt}
              className="aspect-square w-full shrink-0 snap-center object-contain"
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {images.map((img, i) => (
            <span
              key={img.url}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Imagem anterior" : "Próxima imagem"}
      className={cn(
        "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-sm transition hover:bg-card",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
