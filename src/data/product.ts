/**
 * Dados centralizados do produto.
 * Altere aqui preços, especificações e textos — a página inteira lê deste arquivo.
 */

export const CONSULTAR = "Consultar especificações";

export const product = {
  id: "pc-gamer-completo",
  name: "PC Gamer Completo",
  condition: "Produto novo",
  brand: CONSULTAR,
  model: CONSULTAR,
  sku: "PCG-COMPLETO-001",
  breadcrumb: ["Início", "Informática", "PC Gamer", "Computadores"],
  images: [
    {
      url: "/images/product-1.jpg",
      alt: "PC Gamer Completo com gabinete RGB, monitor, teclado, mouse e headset",
    },
    {
      url: "/images/product-2.jpg",
      alt: "Detalhe do setup do PC Gamer Completo com iluminação RGB",
    },
  ],
  // Preços demonstrativos — fáceis de alterar
  precoOriginal: 2560.2,
  precoPromocional: 1000.0,
  percentualDesconto: 61,
  parcelamento: { vezes: 10, valor: 100.0, juros: false },
  estoque: 1,
  maxPorCompra: 1,
  highlights: [
    { title: "Radeon RX 580", subtitle: "Placa de vídeo dedicada", icon: "gpu" },
    { title: "Intel Core i5", subtitle: "Processador", icon: "cpu" },
    { title: "SSD 250 GB", subtitle: "Sistema e jogos rápidos", icon: "ssd" },
    { title: "2 TB Externo", subtitle: "Armazenamento extra", icon: "hdd" },
    { title: "Kit Completo", subtitle: "Monitor, teclado, mouse e headset", icon: "kit" },
  ],
  specs: [
    { label: "Placa de vídeo", value: "Radeon RX 580" },
    { label: "Processador", value: "Intel Core i5" },
    { label: "Geração do processador", value: CONSULTAR },
    { label: "Memória RAM", value: CONSULTAR },
    { label: "Armazenamento SSD", value: "250 GB" },
    { label: "Armazenamento externo", value: "2 TB" },
    { label: "Gabinete", value: "Gabinete gamer com iluminação RGB" },
    { label: "Fonte de alimentação", value: CONSULTAR },
    { label: "Placa-mãe", value: CONSULTAR },
    { label: "Sistema operacional", value: CONSULTAR },
    { label: "Monitor", value: "Incluso — especificações a consultar" },
    { label: "Teclado", value: "Teclado gamer incluso" },
    { label: "Mouse", value: "Mouse gamer incluso" },
    { label: "Headset", value: "Headset gamer incluso" },
    { label: "Condição", value: "Produto novo" },
    { label: "Garantia", value: CONSULTAR },
  ],
  about: [
    {
      title: "Desempenho para jogar",
      text: "A combinação de processador Intel Core i5 com placa de vídeo dedicada Radeon RX 580 entrega desempenho para jogos e para tarefas do dia a dia. Configurações específicas como geração do processador e memória RAM devem ser consultadas antes da compra.",
    },
    {
      title: "Armazenamento híbrido",
      text: "SSD de 250 GB para inicialização rápida do sistema e dos jogos mais usados, somado a 2 TB de armazenamento externo para guardar a biblioteca completa, vídeos e backups.",
    },
    {
      title: "Setup pronto para usar",
      text: "Você recebe o computador com gabinete gamer de iluminação RGB acompanhado de monitor, teclado gamer, mouse e headset. É só conectar e começar a jogar.",
    },
  ],
  box: [
    "1x Gabinete gamer com iluminação RGB",
    "1x Monitor",
    "1x Teclado gamer",
    "1x Mouse gamer",
    "1x Headset gamer",
    "1x HD externo 2 TB",
    "Cabos de alimentação e vídeo",
    "Manual e termo de garantia",
  ],
  seller: {
    name: "TechStore Oficial",
    reputation: "MercadoLíder",
    sales: "+5 mil vendas",
    responseTime: "Responde rápido",
    location: "Mirassol, SP",
  },
  faq: [
    {
      q: "O computador já vem com sistema operacional instalado?",
      a: "Consultar especificações. Envie sua pergunta e o vendedor responderá com a configuração exata.",
      demo: true,
    },
    {
      q: "Roda os jogos atuais em 1080p?",
      a: "A Radeon RX 580 é uma placa dedicada voltada para jogos em Full HD. O desempenho varia conforme o título e as configurações gráficas.",
      demo: true,
    },
    {
      q: "O monitor acompanha cabo HDMI?",
      a: "Os cabos de vídeo e alimentação acompanham o kit. Modelo do cabo: consultar especificações.",
      demo: true,
    },
  ],
  /** Avaliações demonstrativas — troque isDemo por false ao conectar avaliações reais */
  reviews: {
    isDemo: true,
    average: 4.8,
    total: 0,
    items: [
      { author: "Cliente demonstrativo", rating: 5, text: "Exemplo de avaliação para visualização do layout.", date: "01/09/2026" },
      { author: "Cliente demonstrativo", rating: 5, text: "Exemplo de avaliação para visualização do layout.", date: "28/08/2026" },
    ],
  },
} as const;

export type Product = typeof product;

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
