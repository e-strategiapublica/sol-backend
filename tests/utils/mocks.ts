export const mockBid = {
  add_allotment: [],
  description: "Aquisição de equipamentos de informática",
  bid_count: 1,
  start_at: new Date("2024-01-10"),
  association: {
    association: {
      name: "Associação X",
      address: {
        publicPlace: "Rua Exemplo",
        number: "123",
        complement: "Sala 2",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
      },
      cnpj: "12.345.678/0001-90",
      legalRepresentative: {
        name: "João da Silva",
      },
    },
    email: "contato@associacaox.org",
  },
  agreement: {
    register_number: "001/2024",
    register_object: "Desenvolvimento de sistema",
    workPlan: [
      {
        name: "Fase 1",
        amount: 5000,
      },
    ],
  },
  local_to_delivery: "Almoxarifado Central",
  days_to_delivery: 15,
  status: "open",
  invited_suppliers: [],
  createdAt: new Date("2024-01-01"),
};

export const mockContract = [
  {
    value: 10000,
    contract_number: "CONTR-001/2024",
    createdAt: new Date("2024-02-01"),
    supplier_id: {
      name: "Empresa Fornecedora Ltda.",
      cpf: "123.456.789-00",
      legal_representative: {
        name: "Maria Oliveira",
      },
      address: {
        publicPlace: "Av. das Nações",
        number: "1000",
        complement: "Bloco B",
        city: "Brasília",
        state: "DF",
        zipCode: "70000-000",
      },
    },
  },
];

export const mockProposals = [
  {
    item: "Notebook",
    quantity: 10,
    unitValue: 2500,
  },
  {
    item: "Impressora",
    quantity: 5,
    unitValue: 800,
  },
];
