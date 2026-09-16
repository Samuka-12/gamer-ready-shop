import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Truck, ShieldCheck, Lock, CreditCard, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/store/Header";
import { Gallery } from "@/components/store/Gallery";
import { BuyBox } from "@/components/store/BuyBox";
import { Stars } from "@/components/store/Stars";
import { Checkout } from "@/components/store/Checkout";
import {
  About, BoxContents, Faq, Highlights, PaymentMethods, Reviews, SectionCard, SpecsTable,
} from "@/components/store/Sections";
import { brl, product } from "@/data/product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PC Gamer Completo — RX 580, Core i5, SSD 250GB | NovaShop" },
      {
        name: "description",
        content:
          "PC Gamer Completo com Radeon RX 580, Intel Core i5, SSD 250 GB, HD externo 2 TB, gabinete RGB, monitor, teclado, mouse e headset. Frete grátis e até 10x sem juros.",
      },
      { property: "og:title", content: "PC Gamer Completo — RX 580, Core i5, SSD 250GB" },
      {
        property: "og:description",
        content:
          "Setup gamer pronto para usar: RX 580, Core i5, SSD 250 GB, 2 TB externo e kit completo de periféricos.",
      },
      { property: "og:image", content: product.images[0].url },
      { name: "twitter:image", content: product.images[0].url },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = () => {
    setCart((c) => c + quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho.`);
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header cartCount={cart} />

      <main className="mx-auto max-w-7xl px-4 py-5">
        <nav aria-label="Trilha de navegação" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {product.breadcrumb.map((b, i) => (
            <span key={b} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3" />}
              <a href="#" className="hover:text-primary">{b}</a>
            </span>
          ))}
        </nav>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_340px]">
            <Gallery images={product.images} />

            <div className="contents">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{product.condition}</Badge>
                  <span>SKU {product.sku}</span>
                  <button
                    className="ml-auto inline-flex items-center gap-1 hover:text-primary"
                    onClick={() => toast.success("Link do produto copiado para compartilhar.")}
                  >
                    <Share2 className="size-3.5" /> Compartilhar
                  </button>
                </div>

                <h1 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Stars value={5} />
                  <span className="text-xs text-muted-foreground">
                    Avaliações de clientes aparecerão aqui após as primeiras compras.
                  </span>
                </div>

                {/* Bloco de preço */}
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground line-through">
                    {brl(product.precoOriginal)}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-4xl font-semibold text-price sm:text-5xl">
                      {brl(product.precoPromocional)}
                    </span>
                    <span className="rounded-md bg-success/12 px-2 py-1 text-sm font-semibold text-success">
                      {product.percentualDesconto}% OFF
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-success">
                    em até <strong>{product.parcelamento.vezes}x de {brl(product.parcelamento.valor)}</strong>{" "}
                    {product.parcelamento.juros ? "" : "sem juros"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Preço demonstrativo — configurável em <code>src/data/product.ts</code>
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.highlights.slice(0, 4).map((h) => (
                    <div key={h.title} className="rounded-lg bg-muted/60 px-3 py-2 text-sm">
                      <span className="font-semibold">{h.title}</span>
                      <span className="block text-xs text-muted-foreground">{h.subtitle}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Truck className="size-4 text-primary" /> Frete grátis</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Compra garantida</span>
                  <span className="flex items-center gap-1.5"><Lock className="size-4 text-primary" /> Pagamento protegido</span>
                  <span className="flex items-center gap-1.5"><CreditCard className="size-4 text-primary" /> Parcelamento sem juros</span>
                </div>
              </div>

              <div className="lg:col-span-2 xl:col-span-1">
                <BuyBox
                  quantity={quantity}
                  setQuantity={setQuantity}
                  onBuy={() => setCheckoutOpen(true)}
                  onAddToCart={addToCart}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <SectionCard title="Destaques do produto">
            <Highlights />
          </SectionCard>

          <SectionCard title="Características técnicas">
            <SpecsTable />
            <p className="mt-3 text-xs text-muted-foreground">
              Itens marcados como “Consultar especificações” não foram informados pelo vendedor.
            </p>
          </SectionCard>

          <SectionCard title="Sobre este produto">
            <About />
          </SectionCard>

          <SectionCard title="O que vem na caixa?">
            <BoxContents />
          </SectionCard>

          <SectionCard title="Perguntas e respostas">
            <Faq />
          </SectionCard>

          <SectionCard title="Avaliações de clientes">
            <Reviews />
          </SectionCard>

          <SectionCard title="Meios de pagamento">
            <PaymentMethods />
          </SectionCard>
        </div>
      </main>

      <footer className="mt-10 border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-xs text-muted-foreground">
          <p className="font-display text-sm font-semibold text-foreground">NovaShop</p>
          <p className="mt-2">
            Página demonstrativa de produto. Preços, avaliações e prazos exibidos são exemplos
            configuráveis.
          </p>
        </div>
      </footer>

      {/* Barra de compra fixa no mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold leading-none">
              {brl(product.precoPromocional)}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {product.parcelamento.vezes}x de {brl(product.parcelamento.valor)} sem juros
            </p>
          </div>
          <Button variant="secondary" className="ml-auto h-11" onClick={addToCart}>
            Carrinho
          </Button>
          <Button className="h-11" onClick={() => setCheckoutOpen(true)}>
            Comprar agora
          </Button>
        </div>
      </div>

      <Checkout open={checkoutOpen} onOpenChange={setCheckoutOpen} quantity={quantity} />
    </div>
  );
}
