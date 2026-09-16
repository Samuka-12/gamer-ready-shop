# Gamer Hub Page

Construa uma página de produto de e-commerce completa e profissional para o "PC Gamer Completo", inspirada na experiência e UX de grandes marketplaces brasileiros, acompanhada de um fluxo de checkout funcional.

Siga rigorosamente as diretrizes enviadas no documento anexo:
1. IMAGENS DO PRODUTO:
Use exatamente as imagens reais indicadas da referência:
- Imagem 1: https://http2.mlstatic.com/D_NQ_NP_2X_744849-MLA110989412319_042026-F.webp
- Imagem 2: https://http2.mlstatic.com/D_NQ_NP_2X_928296-MLA110076286300_042026-F.webp
Galeria interativa com miniaturas verticais, troca de imagem, zoom ao passar o mouse e carrossel swipe no mobile.

2. ESPECIFICAÇÕES E DADOS DO PRODUTO (centralizado em arquivo data/product.ts):
- Nome: PC Gamer Completo
- Placa de vídeo: Radeon RX 580
- Processador: Intel Core i5
- Armazenamento SSD: 250 GB
- Armazenamento externo: 2 TB
- Gabinete gamer com iluminação RGB
- Periféricos inclusos: Monitor, Teclado gamer, Mouse gamer, Headset gamer
- Condição: Produto novo
- Preço demonstrativo configurável: De R$ 3.899,00 por R$ 2.999,00 (23% OFF), em até 10x de R$ 299,90 sem juros.
Atenção: Não invente especificações que não foram dadas (RAM, geração do i5, watts da fonte); onde faltar dado, exiba "Consultar especificações" ou deixe campo personalizável.

3. ESTRUTURA DA PÁGINA:
- Header completo com busca, categorias, carrinho e login
- Breadcrumb (Início > Informática > PC Gamer > Computadores)
- Coluna esquerda: Galeria de imagens
- Coluna direita: Título, classificação em estrelas, "Produto novo", bloco de preço com desconto e parcelas, box de compra com seletor de quantidade e botões "Comprar agora" e "Adicionar ao carrinho"
- Barra de compra flutuante/fixa no mobile
- Simulador de frete com campo de CEP e máscara (com simulação de Sedex / Frete Grátis)
- Selos de segurança e benefícios (Compra Garantida, Pagamento Protegido, etc.)
- Card do vendedor com reputação e dados da loja
- Destaques visuais do produto em cards (RX 580, Core i5, SSD 250GB, 2TB Externo, Kit Completo)
- Tabela de especificações técnicas completas
- Seção "Sobre este produto" (Desempenho, Armazenamento híbrido, Setup pronto)
- Seção "O que vem na caixa?"
- Perguntas frequentes com campo para enviar pergunta e perguntas demonstrativas
- Avaliações de clientes sinalizadas como demonstrativas (com flag isDemo)
- Seção com bandeiras e meios de pagamento (Pix, Cartão, Boleto)

4. CHECKOUT FUNCIONAL:
- Ao clicar em "Comprar agora", abrir tela ou modal de checkout completo
- Resumo do pedido com o PC Gamer, quantidade e valores
- Formulário de dados pessoais (Nome, CPF com máscara, E-mail, Telefone)
- Endereço de entrega (CEP com autopreenchimento mock, Rua, Número, Bairro, Cidade, Estado)
- Seleção de pagamento: PIX (com chave/QR code demonstrativo e botão de copiar), Cartão de crédito (com campos validados e máscaras de número, validade e CVV) ou Boleto
- Tela de confirmação e sucesso do pedido com número do pedido e resumo.

5. DESIGN:
Visual clean, moderno e refinado, tipografia elegante, paleta profissional de e-commerce brasileiro, 100% responsivo para mobile e desktop.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/27954a89-b547-4c1a-bf1a-a7db9e03ca31).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
