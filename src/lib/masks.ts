const digits = (v: string) => v.replace(/\D/g, "");

export const maskCEP = (v: string) =>
  digits(v).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

export const maskCPF = (v: string) =>
  digits(v)
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");

export const maskPhone = (v: string) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d{1,4})$/, "$1-$2");
};

export const maskCard = (v: string) =>
  digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();

export const maskExpiry = (v: string) =>
  digits(v).slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

export const maskCVV = (v: string) => digits(v).slice(0, 4);

export const onlyDigits = digits;

export const isValidCPF = (v: string) => {
  const d = digits(v);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(d[9]) && calc(10) === Number(d[10]);
};

export const isValidExpiry = (v: string) => {
  const d = digits(v);
  if (d.length !== 4) return false;
  const m = Number(d.slice(0, 2));
  return m >= 1 && m <= 12;
};
