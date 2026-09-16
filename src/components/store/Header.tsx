import { useState } from "react";
import { Search, ShoppingCart, ChevronDown, Menu, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const categorias = [
  "Informática",
  "Games",
  "Celulares e Telefones",
  "Eletrônicos, Áudio e Vídeo",
  "Casa, Móveis e Decoração",
  "Eletrodomésticos",
  "Acessórios para Veículos",
  "Beleza e Cuidado Pessoal",
  "Moda",
  "Esportes e Fitness",
];

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const [searchValue, setSearchValue] = useState("");
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFE600] text-[#333333] shadow-xs">
      <div className="mx-auto max-w-[1200px] px-3 sm:px-4">
        {/* Top Row: Logo, Search, Promo Banner / Actions */}
        <div className="flex items-center justify-between gap-2.5 pt-2.5 pb-2 sm:gap-4 md:gap-6">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#333333] hover:bg-black/5 -ml-1 size-9"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white">
              <SheetHeader className="border-b pb-3">
                <SheetTitle className="flex items-center gap-2 text-left text-base font-semibold text-gray-800">
                  <span className="font-bold text-[#2D3277]">Mercado Livre</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-3 space-y-1">
                <div className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Categorias
                </div>
                {categorias.map((c) => (
                  <a
                    key={c}
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {c}
                  </a>
                ))}
                <div className="my-2 border-t pt-2">
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Ofertas
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Cupons
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Supermercado
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Moda
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span>Mercado Play</span>
                    <span className="rounded-full bg-[#00a650] px-1.5 py-0.5 text-[9px] font-bold text-white uppercase">
                      Grátis
                    </span>
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Vender
                  </a>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Contato
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo Mercado Livre */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-1.5 transition-opacity hover:opacity-95"
            aria-label="Mercado Livre"
          >
            <img
              src="/images/logo.png"
              alt="Mercado Livre"
              className="h-8 w-auto sm:h-9 object-contain"
            />
          </a>

          {/* Search Bar */}
          <form
            className="relative flex flex-1 max-w-[650px] items-center"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <div className="flex w-full items-center overflow-hidden rounded-[2px] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.18)] focus-within:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Buscar produtos, marcas e muito mais…"
                aria-label="Buscar produtos, marcas e muito mais"
                className="h-10 w-full border-none bg-transparent px-3.5 text-sm text-[#333333] placeholder:text-[#999999] focus:outline-none"
              />
              <div className="h-6 w-[1px] bg-gray-200" />
              <button
                type="submit"
                className="grid h-10 w-11 place-items-center bg-white text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Buscar"
              >
                <Search className="size-4.5 stroke-[2.2]" />
              </button>
            </div>
          </form>

          {/* User Links on Top Right */}
          <div className="hidden lg:flex items-center gap-4 text-[13px] text-[#333333]">
            <a href="#" className="hover:text-black transition-colors">
              Crie a sua conta
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Entre
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Compras
            </a>
            <a
              href="#"
              className="relative p-1 text-[#333333] hover:text-black transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="size-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid size-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </a>
          </div>

          {/* Mobile Cart Button */}
          <div className="flex items-center lg:hidden">
            <a
              href="#"
              className="relative p-1.5 text-[#333333] hover:text-black"
              aria-label="Carrinho"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid size-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {/* Bottom Row: Navigation links */}
        <div className="hidden lg:flex items-center justify-between pb-2.5 pt-0.5 text-[13px] text-[#333333]">
          {/* Main navigation (left/center) */}
          <nav className="flex items-center gap-4 xl:gap-5">
            {/* Categorias dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                onBlur={() => setTimeout(() => setCatOpen(false), 200)}
                className="flex items-center gap-1 text-[#333333]/90 hover:text-black transition-colors"
              >
                <span>Categorias</span>
                <ChevronDown className="size-3.5 opacity-70" />
              </button>

              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 z-50">
                  {categorias.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Ofertas
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Cupons
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Supermercado
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Moda
            </a>
            
            {/* Mercado Play with "GRÁTIS" badge */}
            <a
              href="#"
              className="relative flex items-center text-[#333333]/90 hover:text-black transition-colors"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00a650] px-1 py-[1px] text-[8.5px] font-bold uppercase tracking-tight text-white leading-none shadow-xs">
                GRÁTIS
              </span>
              <span>Mercado Play</span>
            </a>

            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Vender
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Contato
            </a>
          </nav>

          {/* User menu & cart (right) */}
          <div className="flex items-center gap-4 xl:gap-5">
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Crie a sua conta
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Entre
            </a>
            <a href="#" className="text-[#333333]/90 hover:text-black transition-colors">
              Compras
            </a>
            <a
              href="#"
              className="relative text-[#333333]/90 hover:text-black transition-colors p-1"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="size-4.5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 grid size-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
