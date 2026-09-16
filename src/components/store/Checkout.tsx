import { useMemo, useState } from "react";
import {
  Check, Copy, CreditCard, QrCode, Barcode, ChevronLeft, CheckCircle2, Loader2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { brl, product } from "@/data/product";
import {
  isValidCPF, isValidExpiry, maskCEP, maskCPF, maskCVV, maskCard, maskExpiry, maskPhone, onlyDigits,
} from "@/lib/masks";

type Pagamento = "pix" | "cartao" | "boleto";

const CEP_MOCK: Record<string, { rua: string; bairro: string; cidade: string; estado: string }> = {
  default: {
    rua: "Avenida Paulista",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
  },
};

const PIX_KEY = "00020126580014BR.GOV.BCB.PIX0136novashop-demo-pix-5204000053039865802BR";

export function Checkout({
  open,
  onOpenChange,
  quantity,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  quantity: number;
}) {
  const [step, setStep] = useState(1);
  const [pagamento, setPagamento] = useState<Pagamento>("pix");
  const [processing, setProcessing] = useState(false);
  const [pedido, setPedido] = useState("");
  const [copied, setCopied] = useState(false);

  const [f, setF] = useState({
    nome: "", cpf: "", email: "", telefone: "",
    cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "",
    cardNome: "", cardNumero: "", cardValidade: "", cardCvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const subtotal = product.precoPromocional * quantity;
  const total = subtotal;
  const desconto = (product.precoOriginal - product.precoPromocional) * quantity;

  const reset = () => {
    setStep(1);
    setProcessing(false);
    setPedido("");
    setErrors({});
  };

  const buscarCep = (value: string) => {
    const v = maskCEP(value);
    set("cep", v);
    if (onlyDigits(v).length === 8) {
      const m = CEP_MOCK["default"]!;
      setF((p) => ({ ...p, cep: v, rua: m.rua, bairro: m.bairro, cidade: m.cidade, estado: m.estado }));
      toast.success("Endereço preenchido automaticamente.");
    }
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (f.nome.trim().length < 3) e["nome"] = "Informe seu nome completo.";
    if (!isValidCPF(f.cpf)) e["cpf"] = "CPF inválido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e["email"] = "E-mail inválido.";
    if (onlyDigits(f.telefone).length < 10) e["telefone"] = "Telefone inválido.";
    if (onlyDigits(f.cep).length !== 8) e["cep"] = "CEP inválido.";
    if (!f.rua.trim()) e["rua"] = "Informe a rua.";
    if (!f.numero.trim()) e["numero"] = "Informe o número.";
    if (!f.bairro.trim()) e["bairro"] = "Informe o bairro.";
    if (!f.cidade.trim()) e["cidade"] = "Informe a cidade.";
    if (f.estado.trim().length !== 2) e["estado"] = "UF com 2 letras.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (pagamento !== "cartao") return true;
    const e: Record<string, string> = {};
    if (f.cardNome.trim().length < 3) e["cardNome"] = "Informe o nome impresso no cartão.";
    if (onlyDigits(f.cardNumero).length !== 16) e["cardNumero"] = "Número do cartão incompleto.";
    if (!isValidExpiry(f.cardValidade)) e["cardValidade"] = "Validade inválida (MM/AA).";
    if (onlyDigits(f.cardCvv).length < 3) e["cardCvv"] = "CVV inválido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const finalizar = () => {
    if (!validatePayment()) return;
    setProcessing(true);
    setTimeout(() => {
      setPedido(`NS-${Math.floor(100000 + Math.random() * 899999)}`);
      setProcessing(false);
      setStep(4);
    }, 1200);
  };

  const titles = useMemo(
    () => ["Seus dados e entrega", "Forma de pagamento", "Revisão do pedido", "Pedido confirmado"],
    [],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 250);
      }}
    >
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        <DialogHeader className="border-b border-border px-5 py-4">
          <DialogTitle className="font-display text-lg">
            {step < 4 ? `Checkout — ${titles[step - 1]}` : titles[3]}
          </DialogTitle>
        </DialogHeader>

        {step < 4 && (
          <div className="flex gap-2 border-b border-border px-5 py-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  s <= step ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
        )}

        <div className="grid gap-6 p-5 md:grid-cols-[1fr_280px]">
          <div>
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Dados pessoais</p>
                  <Field label="Nome completo" error={errors["nome"]}>
                    <Input value={f.nome} onChange={(e) => set("nome", e.target.value.slice(0, 80))} placeholder="Seu nome" />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="CPF" error={errors["cpf"]}>
                      <Input inputMode="numeric" value={f.cpf} onChange={(e) => set("cpf", maskCPF(e.target.value))} placeholder="000.000.000-00" />
                    </Field>
                    <Field label="Telefone" error={errors["telefone"]}>
                      <Input inputMode="tel" value={f.telefone} onChange={(e) => set("telefone", maskPhone(e.target.value))} placeholder="(11) 90000-0000" />
                    </Field>
                  </div>
                  <Field label="E-mail" error={errors["email"]}>
                    <Input type="email" value={f.email} onChange={(e) => set("email", e.target.value.slice(0, 120))} placeholder="voce@email.com" />
                  </Field>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm font-semibold">Endereço de entrega</p>
                  <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                    <Field label="CEP" error={errors["cep"]}>
                      <Input inputMode="numeric" value={f.cep} onChange={(e) => buscarCep(e.target.value)} placeholder="00000-000" />
                    </Field>
                    <Field label="Rua" error={errors["rua"]}>
                      <Input value={f.rua} onChange={(e) => set("rua", e.target.value.slice(0, 120))} />
                    </Field>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Número" error={errors["numero"]}>
                      <Input value={f.numero} onChange={(e) => set("numero", e.target.value.slice(0, 10))} />
                    </Field>
                    <Field label="Complemento">
                      <Input value={f.complemento} onChange={(e) => set("complemento", e.target.value.slice(0, 60))} placeholder="Opcional" />
                    </Field>
                    <Field label="Bairro" error={errors["bairro"]}>
                      <Input value={f.bairro} onChange={(e) => set("bairro", e.target.value.slice(0, 60))} />
                    </Field>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
                    <Field label="Cidade" error={errors["cidade"]}>
                      <Input value={f.cidade} onChange={(e) => set("cidade", e.target.value.slice(0, 60))} />
                    </Field>
                    <Field label="Estado" error={errors["estado"]}>
                      <Input value={f.estado} onChange={(e) => set("estado", e.target.value.toUpperCase().slice(0, 2))} placeholder="SP" />
                    </Field>
                  </div>
                </div>

                <Button
                  className="h-11 w-full"
                  onClick={() => (validateStep1() ? setStep(2) : toast.error("Revise os campos destacados."))}
                >
                  Continuar para pagamento
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <RadioGroup value={pagamento} onValueChange={(v) => setPagamento(v as Pagamento)} className="gap-3">
                  <PayOption value="pix" icon={QrCode} title="Pix" desc="Aprovação imediata" current={pagamento} />
                  <PayOption
                    value="cartao"
                    icon={CreditCard}
                    title="Cartão de crédito"
                    desc={`Até ${product.parcelamento.vezes}x sem juros`}
                    current={pagamento}
                  />
                  <PayOption value="boleto" icon={Barcode} title="Boleto bancário" desc="Compensa em até 2 dias úteis" current={pagamento} />
                </RadioGroup>

                {pagamento === "cartao" && (
                  <div className="space-y-3 rounded-lg border border-border p-4">
                    <Field label="Nome impresso no cartão" error={errors["cardNome"]}>
                      <Input value={f.cardNome} onChange={(e) => set("cardNome", e.target.value.toUpperCase().slice(0, 40))} />
                    </Field>
                    <Field label="Número do cartão" error={errors["cardNumero"]}>
                      <Input inputMode="numeric" value={f.cardNumero} onChange={(e) => set("cardNumero", maskCard(e.target.value))} placeholder="0000 0000 0000 0000" />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Validade" error={errors["cardValidade"]}>
                        <Input inputMode="numeric" value={f.cardValidade} onChange={(e) => set("cardValidade", maskExpiry(e.target.value))} placeholder="MM/AA" />
                      </Field>
                      <Field label="CVV" error={errors["cardCvv"]}>
                        <Input inputMode="numeric" value={f.cardCvv} onChange={(e) => set("cardCvv", maskCVV(e.target.value))} placeholder="123" />
                      </Field>
                    </div>
                  </div>
                )}

                {pagamento === "pix" && <PixBlock copied={copied} setCopied={setCopied} />}

                {pagamento === "boleto" && (
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                    O boleto demonstrativo será gerado na confirmação do pedido e enviado para o
                    e-mail informado.
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="h-11" onClick={() => setStep(1)}>
                    <ChevronLeft className="size-4" /> Voltar
                  </Button>
                  <Button className="h-11 flex-1" onClick={() => (validatePayment() ? setStep(3) : toast.error("Revise os dados do cartão."))}>
                    Revisar pedido
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <InfoBlock title="Entrega">
                  {f.nome}
                  <br />
                  {f.rua}, {f.numero} {f.complemento && `- ${f.complemento}`}
                  <br />
                  {f.bairro} — {f.cidade}/{f.estado} · CEP {f.cep}
                </InfoBlock>
                <InfoBlock title="Contato">
                  {f.email} · {f.telefone}
                </InfoBlock>
                <InfoBlock title="Pagamento">
                  {pagamento === "pix" && "Pix — pagamento à vista"}
                  {pagamento === "boleto" && "Boleto bancário"}
                  {pagamento === "cartao" &&
                    `Cartão de crédito final ${onlyDigits(f.cardNumero).slice(-4)} · ${product.parcelamento.vezes}x de ${brl(total / product.parcelamento.vezes)}`}
                </InfoBlock>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-11" onClick={() => setStep(2)} disabled={processing}>
                    <ChevronLeft className="size-4" /> Voltar
                  </Button>
                  <Button className="h-11 flex-1" onClick={finalizar} disabled={processing}>
                    {processing ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Processando…
                      </>
                    ) : (
                      "Finalizar compra"
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="py-4 text-center">
                <CheckCircle2 className="mx-auto size-14 text-success" />
                <h3 className="mt-4 font-display text-2xl font-semibold">Pedido confirmado!</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Enviamos os detalhes para {f.email}.
                </p>
                <p className="mt-4 inline-block rounded-lg bg-muted px-4 py-2 text-sm">
                  Número do pedido: <strong>{pedido}</strong>
                </p>
                <div className="mt-6 space-y-1 text-left text-sm">
                  <p className="font-semibold">Resumo</p>
                  <p className="text-muted-foreground">
                    {quantity}x {product.name} — {brl(total)}
                  </p>
                  <p className="text-muted-foreground">
                    Entrega em {f.rua}, {f.numero} — {f.cidade}/{f.estado}
                  </p>
                  <p className="text-muted-foreground">
                    Pagamento: {pagamento === "pix" ? "Pix" : pagamento === "boleto" ? "Boleto" : "Cartão de crédito"}
                  </p>
                </div>
                <Button className="mt-6 h-11 w-full" onClick={() => onOpenChange(false)}>
                  Continuar comprando
                </Button>
              </div>
            )}
          </div>

          {/* Resumo do pedido */}
          <aside className="order-first h-fit rounded-xl border border-border bg-muted/40 p-4 md:order-last md:sticky md:top-4">
            <p className="text-sm font-semibold">Resumo do pedido</p>
            <div className="mt-3 flex gap-3">
              <img
                src={product.images[0]!.url}
                alt={product.images[0]!.alt}
                className="size-16 rounded-lg border border-border bg-card object-contain"
              />
              <div className="text-sm">
                <p className="font-medium leading-tight">{product.name}</p>
                <p className="text-xs text-muted-foreground">Quantidade: {quantity}</p>
              </div>
            </div>
            <Separator className="my-3" />
            <dl className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={brl(product.precoOriginal * quantity)} />
              <Row label="Desconto" value={`- ${brl(desconto)}`} accent />
              <Row label="Frete" value="Grátis" accent />
            </dl>
            <Separator className="my-3" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="font-display text-xl font-semibold">{brl(total)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              ou {product.parcelamento.vezes}x de {brl(total / product.parcelamento.vezes)} sem juros
            </p>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-medium text-success" : "font-medium"}>{value}</dd>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-4 text-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function PayOption({
  value,
  icon: Icon,
  title,
  desc,
  current,
}: {
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  current: string;
}) {
  return (
    <Label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
        current === value ? "border-primary bg-accent/60" : "border-border hover:bg-muted/60",
      )}
    >
      <RadioGroupItem value={value} />
      <Icon className="size-5 text-primary" />
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs font-normal text-muted-foreground">{desc}</span>
      </span>
    </Label>
  );
}

function PixBlock({ copied, setCopied }: { copied: boolean; setCopied: (v: boolean) => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/40 p-5 text-center">
      <div className="grid size-36 place-items-center rounded-lg border border-border bg-card">
        <QrCode className="size-24 text-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">
        QR Code demonstrativo. Copie a chave Pix abaixo para simular o pagamento.
      </p>
      <div className="flex w-full gap-2">
        <Input readOnly value={PIX_KEY} className="truncate text-xs" aria-label="Chave Pix" />
        <Button
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(PIX_KEY);
              setCopied(true);
              toast.success("Chave Pix copiada!");
              setTimeout(() => setCopied(false), 2000);
            } catch {
              toast.error("Não foi possível copiar a chave.");
            }
          }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
