import { useState } from "react";
import {
  Cpu, HardDrive, MemoryStick, Monitor, Package, CreditCard, QrCode, Barcode, Send, MonitorPlay,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Stars } from "./Stars";
import { product } from "@/data/product";

const icons = {
  gpu: MonitorPlay,
  cpu: Cpu,
  ssd: MemoryStick,
  hdd: HardDrive,
  kit: Monitor,
} as const;

export function SectionCard({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-xl border border-border bg-card p-5 sm:p-7">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Highlights() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {product.highlights.map((h) => {
        const Icon = icons[h.icon as keyof typeof icons];
        return (
          <div
            key={h.title}
            className="rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:border-primary/40 hover:bg-accent/60"
          >
            <Icon className="size-5 text-primary" />
            <p className="mt-3 font-semibold leading-tight">{h.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{h.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}

export function SpecsTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <tbody>
          {product.specs.map((s, i) => (
            <tr key={s.label} className={i % 2 ? "bg-card" : "bg-muted/50"}>
              <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-muted-foreground">
                {s.label}
              </th>
              <td className="px-4 py-3 font-medium">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function About() {
  return (
    <div className="space-y-6">
      {product.about.map((a) => (
        <article key={a.title}>
          <h3 className="text-base font-semibold">{a.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
        </article>
      ))}
    </div>
  );
}

export function BoxContents() {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {product.box.map((b) => (
        <li key={b} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm">
          <Package className="size-4 shrink-0 text-primary" />
          {b}
        </li>
      ))}
    </ul>
  );
}

export function Faq() {
  const [q, setQ] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Textarea
          value={q}
          onChange={(e) => setQ(e.target.value.slice(0, 500))}
          placeholder="Escreva sua pergunta sobre o produto…"
          className="min-h-11 resize-none"
          aria-label="Sua pergunta"
        />
        <Button
          className="sm:self-end"
          onClick={() => {
            if (!q.trim()) {
              toast.error("Escreva sua pergunta antes de enviar.");
              return;
            }
            setQ("");
            toast.success("Pergunta enviada! O vendedor responderá em breve.");
          }}
        >
          <Send className="size-4" /> Perguntar
        </Button>
      </div>

      <Separator className="my-6" />

      <p className="mb-4 text-sm font-semibold">Últimas perguntas</p>
      <ul className="space-y-5">
        {product.faq.map((f) => (
          <li key={f.q}>
            <p className="text-sm font-medium">{f.q}</p>
            <p className="mt-1 border-l-2 border-border pl-3 text-sm text-muted-foreground">
              {f.a}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Reviews() {
  const { isDemo, average, items } = product.reviews;
  return (
    <div>
      {isDemo && (
        <Badge variant="secondary" className="mb-4">
          Conteúdo demonstrativo
        </Badge>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="text-center sm:text-left">
          <p className="font-display text-4xl font-semibold">{average.toFixed(1)}</p>
          <Stars value={average} className="mt-1" />
        </div>
        <p className="text-sm text-muted-foreground sm:border-l sm:border-border sm:pl-5">
          Avaliações de clientes aparecerão aqui após as primeiras compras.
        </p>
      </div>

      <Separator className="my-6" />

      <ul className="space-y-5">
        {items.map((r, i) => (
          <li key={i}>
            <Stars value={r.rating} />
            <p className="mt-1.5 text-sm">{r.text}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {r.author} · {r.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PaymentMethods() {
  const cards = ["Visa", "Mastercard", "Elo", "Amex", "Hipercard"];
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <QrCode className="size-4 text-primary" /> Pix
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Aprovação imediata e confirmação em segundos.
        </p>
      </div>
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <CreditCard className="size-4 text-primary" /> Cartão de crédito
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Em até {product.parcelamento.vezes}x sem juros.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {cards.map((c) => (
            <span
              key={c}
              className="rounded border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Barcode className="size-4 text-primary" /> Boleto bancário
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Compensação em até 2 dias úteis.
        </p>
      </div>
    </div>
  );
}
