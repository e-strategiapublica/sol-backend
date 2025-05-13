import "@faker-js/faker";

declare module "@faker-js/faker" {
  interface Faker {
    cpf: {
      generate: () => string;
      generateWithMask: () => string;
    };
  }
}
