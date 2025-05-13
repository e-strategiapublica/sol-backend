import { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { fakerCpfPlugin } from "../utils/faker.cpf";
faker.cpf = fakerCpfPlugin(faker);

export class BidRepositoryMock {
  static fakeBid() {
    const fakeData = {
      _id: new Types.ObjectId(),
      bid_count: "18",
      description: faker.commerce.productDescription(),
      agreement: new Types.ObjectId(),
      classification: "bens",
      start_at: "",
      end_at: "1",
      days_to_tiebreaker: "1",
      days_to_delivery: "1",
      deleted: false,
      local_to_delivery: "Avenida Professor João Augusto de Carvalho",
      bid_type: "individualPrice",
      modality: "openClosed",
      status: "draft",
      aditional_site: "",
      add_allotment: [new Types.ObjectId()],
      invited_suppliers: [],
      state: "Rondônia",
      city: "Cabixi",
      association: new Types.ObjectId(),
      additionalDocuments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
    };

    return fakeData;
  }
  static register() {
    return BidRepositoryMock.fakeBid();
  }
}
