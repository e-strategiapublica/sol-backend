import { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { fakerCpfPlugin } from "../utils/faker.cpf";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { UserRolesEnum } from "src/modules/SOL/enums/user-roles.enum";
faker.cpf = fakerCpfPlugin(faker);

export class UserRepositoryMock {
  static fakeUser() {
    const userPayload = {
      _id: new Types.ObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      document: faker.cpf.generate(),
      phone: faker.helpers.replaceSymbols("###########"),
      status: UserStatusEnum.active,
      type: UserTypeEnum.associacao,
      profilePicture: null,
      roles: UserRolesEnum.geral,
      office: "Associação Demo",
      association: {
        _id: new Types.ObjectId(),
        name: "Entidade para demonstrações",
        cnpj: "30235816000165",
        legalRepresentative: {
          name: "José Bonifácio O Outro",
          nationality: "Brasileiro",
          maritalStatus: "solteiro",
          cpf: "25574939029",
          address: {
            zipCode: "59149195",
            publicPlace: "Avenida Rio Água Vermelha",
            neighborhood: "Emaús",
            city: "Parnamirim",
            state: "RN",
            complement: "",
            referencePoint: "",
            number: "123",
          },
        },
        address: {
          zipCode: "37037031",
          publicPlace: "Avenida Professor João Augusto de Carvalho",
          neighborhood: "Jardim Estrela II",
          city: "Varginha",
          state: "MG",
          latitude: "-21.526745276779046",
          longitude: "-45.45325405080021",
          complement: "",
          referencePoint: "",
          number: "123",
        },
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      notification_list: [
        {
          title: "Licitação aguardando liberação",
          description: "A Licitação 17/2025 está aguardando liberação",
          from_user: "67fd57cfd4e6c3bfd42ba04e",
          deleted: false,
          _id: new Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      password: "$2a$13$1fwEMTwX6Y9XaToLuF0tKeKWZw4p4aLUZ2IAQ8561TfW.O2rgBCL6",
    };

    return userPayload;
  }
  static getById() {
    const userPayload = UserRepositoryMock.fakeUser();

    return userPayload;
  }
}
