// faker-cpf.ts
import { Faker } from "@faker-js/faker";

export function fakerCpfPlugin(faker: Faker) {
  const gerarCPF = (): string => {
    const rand = () => Math.floor(Math.random() * 9);
    const n = Array.from({ length: 9 }, rand);

    const calcDV = (n: number[]) => {
      const base = n.length + 1;
      const sum = n.reduce((acc, digit, idx) => acc + digit * (base - idx), 0);
      const mod = (sum * 10) % 11;
      return mod === 10 ? 0 : mod;
    };

    const d1 = calcDV(n);
    const d2 = calcDV([...n, d1]);

    return [...n, d1, d2].join("");
  };

  const gerarCPFComMascara = (): string => {
    const cpf = gerarCPF();
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return {
    generate: gerarCPF,
    generateWithMask: gerarCPFComMascara,
  };
}
