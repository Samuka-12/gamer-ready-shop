import { useState } from "react";
import { Minus, Plus, ShieldCheck, Truck, RotateCcw, Lock, Store, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { maskCEP, onlyDigits } from "@/lib/masks";
import { brl, product } from "@/data/product";

type Frete = { nome: string; prazo: string; valor: number }[];

export function BuyBox({
  quantity,
  setQuantity,
  onBuy,
  onAddToCart,
}: {
  quantity: number;
  setQuantity: (n: number) => void;
  onBuy: () => void;
  onAddToCart: () => void;
}) {
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<Frete | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const simular = () => {
    if (onlyDigits(cep).length !== 8) {
      setErro("Digite um CEP válido com 8 dígitos.");
      setFrete(null);
      return;
    }
    setErro("");
    setLoading(true);
    setTimeout(() => {
      setFrete([
        { nome: "Frete grátis (Econômico)", prazo: "Chega em 7 a 10 dias úteis", valor: 0 },
        { nome: "Sedex", prazo: "Chega em 2 a 4 dias úteis", valor: 49.9 },
      ]);
      setLoading(false);
    }, 700);
  };

  const max = Math.min(product.maxPorCompra, product.estoque);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-medium text-success">
        <Truck className="size-4" /> Frete grátis para todo o Brasil
      </p>

      <div className="mt-4">
        <Label htmlFor="qty" className="text-xs text-muted-foreground">
          Quantidade
        </Label>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-r-none"
              aria-label="Diminuir quantidade"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="size-4" />
            </Button>
            <span id="qty" className="w-10 text-center text-sm font-semibold">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-l-none"
              aria-label="Aumentar quantidade"
              onClick={() => setQuantity(Math.min(max, quantity + 1))}
            >
              <Plus className="size-4" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.estoque} unidades disponíveis
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Button className="h-12 w-full text-base font-semibold" onClick={onBuy}>
          Comprar agora
        </Button>
        <Button variant="secondary" className="h-12 w-full text-base font-semibold" onClick={onAddToCart}>
          Adicionar ao carrinho
        </Button>
      </div>

      <Separator className="my-5" />

      <div>
        <Label htmlFor="cep" className="text-sm font-semibold">
          Calcular frete e prazo
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="cep"
            inputMode="numeric"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(maskCEP(e.target.value))}
            className="h-10"
          />
          <Button variant="outline" className="h-10" onClick={simular} disabled={loading}>
            {loading ? "Calculando…" : "Calcular"}
          </Button>
        </div>
        {erro && <p className="mt-2 text-xs text-destructive">{erro}</p>}
        {frete && (
          <ul className="mt-3 space-y-2">
            {frete.map((f) => (
              <li
                key={f.nome}
                className="flex items-center justify-between rounded-lg bg-muted/70 px-3 py-2 text-sm"
              >
                <span>
                  <span className="font-medium">{f.nome}</span>
                  <span className="block text-xs text-muted-foreground">{f.prazo}</span>
                </span>
                <span className={f.valor === 0 ? "font-semibold text-success" : "font-semibold"}>
                  {f.valor === 0 ? "Grátis" : brl(f.valor)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Separator className="my-5" />

      <ul className="space-y-3 text-sm">
        <Benefit icon={ShieldCheck} title="Compra Garantida" text="Receba o produto que espera ou devolvemos seu dinheiro." />
        <Benefit icon={Lock} title="Pagamento Protegido" text="Seus dados são criptografados de ponta a ponta." />
        <Benefit icon={RotateCcw} title="Devolução grátis" text="Você tem 7 dias a partir do recebimento." />
      </ul>

      <Separator className="my-5" />

      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
          <Store className="size-5" />
        </span>
        <div className="text-sm">
          <p className="font-semibold">
            Vendido por {product.seller.name}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Medal className="size-3.5 text-success" />
            {product.seller.reputation} · {product.seller.sales}
          </p>
          <p className="text-xs text-muted-foreground">
            {product.seller.responseTime} · {product.seller.location}
          </p>
        </div>
      </div>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>
        <span className="font-medium">{title}</span>
        <span className="block text-xs text-muted-foreground">{text}</span>
      </span>
    </li>
  );
}
