import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ContractRepository } from "../repositories/contract.repository";
import { ContractModel } from "../models/contract.model";
import { ContractRegisterDto } from "../dtos/contract-register-request.dto";
import { ContractUpdateDto } from "../dtos/contract-update-request.dto";
import { ContractStatusEnum } from "../enums/contract-status.enum";
import { NotificationService } from "./notification.service";
import { FileRepository } from "../repositories/file.repository";
import { ProposalRepository } from "../repositories/proposal.repository";
import { ModelContractRepository } from "../repositories/model-contract.repository";
import { AssociationRepository } from "../repositories/association.repository";
import { UserRepository } from "../repositories/user.repository";
import { SupplierRepository } from "../repositories/supplier.repository";
import { text } from "aws-sdk/clients/customerprofiles";
import { ContractUpdateStatusItemDto } from "../dtos/contract-update-status-item-request.dto";
import * as moment from "moment";
import { WorkPlanService } from "./work-plan.service";
import { MutableObject } from "src/shared/interfaces/mutable-object.interface";
import { AllotmentModel } from "../models/allotment.model";
import { CostItemsService } from "./cost-items.service";
import { platform } from "node:process";
import { LanguageContractEnum } from "../enums/language-contract.enum";
import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
import { ProposalModel } from "../models/proposal.model";
import { AgreementRepository } from "../repositories/agreement.repository";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";
import { ErrorMessages } from "src/shared/utils/error-model-document-messages.util";

// import * as docxConverter from 'docx-pdf';
// import * as temp from 'temp';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

@Injectable()
export class ContractService {
  private readonly _logger = new Logger(ContractService.name);

  constructor(
    private readonly _contractRepository: ContractRepository,
    private readonly _notificationService: NotificationService,
    private readonly _fileRepository: FileRepository,
    private readonly _proposalRepository: ProposalRepository,
    private readonly _modelContractRepository: ModelContractRepository,
    private readonly _associationRepository: AssociationRepository,
    private readonly _userRepository: UserRepository,
    private readonly _workPlanService: WorkPlanService,
    private readonly _supplierRepository: SupplierRepository,
    private readonly _costItemsService: CostItemsService,
    private readonly _agreementRepository: AgreementRepository,
  ) {}

  async register(dto: ContractRegisterDto): Promise<ContractModel> {
    //dto.contract_document = this._fileRepository.upload(`product_${new Date().getTime()}.pdf`, dto.contract_document);
    const count: MutableObject<ContractModel>[] =
      await this._contractRepository.list();

    const incrementProposal = count.find(
      (x) =>
        x.bid_number._id.toString() === dto.bid_number.toString() &&
        x.supplier_id._id.toString() === dto.supplier_id.toString(),
    );

    if (incrementProposal) {
      incrementProposal.proposal_id.push(dto.proposal_id[0]);
      incrementProposal.value = incrementProposal.proposal_id
        .reduce((a, b) => a + Number(b.total_value), 0)
        .toFixed(0);
      const result = await this._contractRepository.updateValueAndProposal(
        incrementProposal._id.toString(),
        {
          value: incrementProposal.value,
          proposal: incrementProposal.proposal_id,
        },
      );
      return result;
    }

    dto.contract_number = Number(count.length + 1).toString();

    dto.value = dto.proposal_id[0].total_value;

    const result = await this._contractRepository.register(dto);
    // await this._contractRepository.updateContractNumber(result._id, result.sequencial_number);

    if (!result)
      throw new BadRequestException("Não foi possivel cadastrar esse grupo!");

    return result;
  }

  async list(): Promise<ContractModel[]> {
    const result = await this._contractRepository.listNonDeleted();
    return result;
  }

  async listByUserId(_id: string): Promise<ContractModel[]> {
    //  const user = await this._userRepository.getById(_id)
    const contracts = await this._contractRepository.listNonDeleted();
    const result = contracts.filter(
      (item: ContractModel) =>
        item.bid_number.association._id.toString() === _id,
    );
    //  return await this._contractRepository.listByAssociationId(user.association._id.toString());
    return result;
  }

  async updateStatus(
    _id: string,
    dto: ContractUpdateDto,
  ): Promise<ContractModel> {
    const contract = await this._contractRepository.getById(_id);
    if (!contract) {
      throw new BadRequestException("Contrato não encontrado!");
    }
    if (contract.status === ContractStatusEnum.aguardando_assinaturas) {
      const result = await this._contractRepository.updateStatus(_id, dto);
      return result;
    } else {
      throw new BadRequestException(
        "A situação do contrato já foi atualizada!",
      );
    }
  }

  async updateStatusItens(
    _id: string,
    dto: ContractUpdateStatusItemDto,
  ): Promise<ContractModel> {
    const contract = await this._contractRepository.getById(_id);
    if (!contract) throw new BadRequestException("Contrato não encontrado!");

    const result = await this._contractRepository.updateStatusAndItens(
      _id,
      dto,
    );
    return result;
  }

  async signAssociation(
    _id: string,
    dto: ContractUpdateDto,
  ): Promise<ContractModel> {
    const contract = await this._contractRepository.getById(_id);
    if (!contract) {
      throw new BadRequestException("Contrato não encontrado!");
    }

    const notificationMsg = {
      title: `O contrato ${contract.contract_number} foi assinado`,
      description: `O contrato ${contract.contract_number} foi assinado`,
      from_user: dto.association_id,
      to_user: ["aaa"],
      deleted: false,
    };
    if (contract.status === ContractStatusEnum.aguardando_assinaturas) {
      const result = await this._contractRepository.signAssociation(_id, dto);
      return this.checkAllsignatures(_id);
    } else {
      throw new BadRequestException(
        "A situação do contrato já foi atualizada!",
      );
    }
  }

  async signSupplier(
    _id: string,
    dto: ContractUpdateDto,
  ): Promise<ContractModel> {
    const contract = await this._contractRepository.getById(_id);
    if (!contract) {
      throw new BadRequestException("Contrato não encontrado!");
    }
    const notificationMsg = {
      title: `O contrato ${contract.contract_number} foi assinado`,
      description: `O contrato ${contract.contract_number} foi assinado`,
      from_user: dto.association_id,
      to_user: ["aaa"],
      deleted: false,
    };
    if (contract.status === ContractStatusEnum.aguardando_assinaturas) {
      if (!dto.association_id)
        throw new BadRequestException("A associação não foi informada!");

      const result = await this._contractRepository.signSupplier(_id, dto);
      return this.checkAllsignatures(_id);
    } else {
      throw new BadRequestException(
        "A situação do contrato já foi atualizada!",
      );
    }
  }

  async checkAllsignatures(_id: string): Promise<ContractModel> {
    const contract = await this._contractRepository.getById(_id);

    if (!contract) {
      throw new BadRequestException("Contrato não encontrado!");
    }
    if (contract.status === ContractStatusEnum.aguardando_assinaturas) {
      if (contract.supplier_accept && contract.association_accept) {
        const result = await this._contractRepository.checkAllsignatures(_id);
        return result;
      }
    }

    return contract;
  }

  async contractPdfDownload(_id: string): Promise<text> {
    let propostas = [];
    let convidados = [];
    let lotes = [];
    let lotesCompleto = [];
    let lotesEspecificacao = [];

    const contract = await this._contractRepository.getById(_id);

    if (!contract) {
      throw new BadRequestException("Contrato não encontrado!");
    }

    const result = await this.checkAllsignatures(_id);

    if (!result) {
      throw new BadRequestException("Contrato não encontrado!");
    }

    const modelResponse =
      await this._modelContractRepository.getByClassification(
        contract.bid_number["classification"].toString(),
      );

    if (!modelResponse) {
      throw new BadRequestException(
        "Não foi encontrado um modelo de contrato para essa licitação!",
      );
    }

    const respondeAssociation = await this._associationRepository.getById(
      contract.bid_number["association"]["association"].toString(),
    );
    const responseProposal = await this._proposalRepository.listByBid(
      contract.bid_number["_id"].toString(),
    );

    for (let p = 0; p < responseProposal.length; p++) {
      if (p == 0) {
        propostas.push(
          " empresa " +
            responseProposal[p].proposedBy.name +
            ", inscrita no cnpj " +
            responseProposal[p].proposedBy.document +
            " ",
        );
      } else {
        propostas.push(
          ", empresa " +
            responseProposal[p].proposedBy.name +
            ", inscrita no cnpj " +
            responseProposal[p].proposedBy.document +
            " ",
        );
      }
    }

    for (let q = 0; q < contract.bid_number["invited_suppliers"].length; q++) {
      const suppliers = await this._supplierRepository.listById(
        contract.bid_number["invited_suppliers"][q].toString(),
      );

      if (q == 0) {
        convidados.push(
          " empresa " +
            suppliers.name +
            ", inscrita no cnpj " +
            suppliers.cpf +
            " ",
        );
      } else {
        convidados.push(
          " , empresa " +
            suppliers.name +
            ", inscrita no cnpj " +
            suppliers.cpf +
            " ",
        );
      }
    }

    for (let l = 0; l < contract.bid_number["add_allotment"].length; l++) {
      if (l == 0) {
        lotes.push(
          "" + contract.bid_number["add_allotment"][l].allotment_name + " ",
        );
      } else {
        lotes.push(
          contract.bid_number["add_allotment"][l].allotment_name + " ",
        );
      }
    }

    let valor_estimado = 0;
    for (
      let a = 0;
      a < contract.bid_number["agreement"]["workPlan"].length;
      a++
    ) {
      const responseWorkPlan = await this._workPlanService.findById(
        contract.bid_number["agreement"]["workPlan"][a].toString(),
      );
      for (let allotProd of contract.bid_number["add_allotment"]) {
        for (let p = 0; p < responseWorkPlan.product.length; p++) {
          for (let b = 0; b < allotProd.add_item.length; b++) {
            if (
              responseWorkPlan.product[p].items.name ===
              allotProd.add_item[b].item
            ) {
              let soma =
                responseWorkPlan.product[p].unitValue *
                Number(allotProd.add_item[b].quantity);
              valor_estimado = valor_estimado + soma;

              if (p == 0) {
                lotesEspecificacao.push(
                  " " +
                    responseWorkPlan.product[p].items.name +
                    ": " +
                    " " +
                    responseWorkPlan.product[p].items.specification,
                );
                lotesCompleto.push(
                  "<br>" +
                    allotProd.allotment_name +
                    ": " +
                    "Item: " +
                    responseWorkPlan.product[p].items.name +
                    ", " +
                    "Especificação: " +
                    responseWorkPlan.product[p].items.specification +
                    ", " +
                    "Quantidade: " +
                    allotProd.add_item[b].quantity +
                    ", " +
                    "Unidade: " +
                    responseWorkPlan.product[p].items.unitMeasure +
                    ", " +
                    "Valor unitário: " +
                    responseWorkPlan.product[p].unitValue +
                    ", " +
                    "Valor do frete: " +
                    contract.proposal_id.reduce(
                      (acc, item) => acc + Number(item.freight),
                      0,
                    ) +
                    ", " +
                    "Valor total: " +
                    contract.proposal_id.reduce(
                      (acc, item) => acc + Number(item.total_value),
                      0,
                    ) +
                    "",
                );
              } else {
                lotesEspecificacao.push(
                  ", " + responseWorkPlan.product[p].items.specification,
                );
                lotesCompleto.push(
                  "Item: " +
                    responseWorkPlan.product[p].items.name +
                    ", " +
                    "Especificação: " +
                    responseWorkPlan.product[p].items.specification +
                    ", " +
                    "Quantidade: " +
                    allotProd.add_item[b].quantity +
                    ", " +
                    "Unidade: " +
                    responseWorkPlan.product[p].items.unitMeasure +
                    ", " +
                    "Valor unitário: " +
                    responseWorkPlan.product[p].unitValue +
                    ", " +
                    "Valor do frete: " +
                    contract.proposal_id.reduce(
                      (acc, item) => acc + Number(item.freight),
                      0,
                    ) +
                    ", " +
                    "Valor total: " +
                    contract.proposal_id.reduce(
                      (acc, item) => acc + Number(item.total_value),
                      0,
                    ) +
                    "",
                );
              }
            }
          }
        }
      }
    }
    const userResponde = await this._userRepository.getById(
      contract.proposal_id["proposedBy"].toString(),
    );

    const forcedorResponse = await this._supplierRepository.listById(
      userResponde.supplier.id,
    );

    //Contrato e assinaturas
    let contractFormated = modelResponse.contract
      .replace(/\[contract_number\]/g, " " + contract.contract_number + " ")
      .replace(
        /\[supplier_signature\]/g,
        " " + forcedorResponse.legal_representative.name + " ",
      )
      .replace(
        /\[signature_association\]/g,
        " " + respondeAssociation.legalRepresentative.name + " ",
      )

      //FORNECEDOR
      .replace("[supplier_name]", " " + forcedorResponse.name + " ")
      .replace(
        "[</span>supplier_name<span>]",
        " " + forcedorResponse.name + " ",
      )
      .replace("[supplier]", " " + forcedorResponse.name + " ")
      .replace("[supplier_id]", " " + forcedorResponse.cpf + " ")
      .replace(
        "[supplier_zip_code]",
        " " + forcedorResponse.address.zipCode + "",
      )
      .replace(
        "[supplier_address]",
        " " +
          forcedorResponse.address.publicPlace +
          " " +
          forcedorResponse.address.number +
          " " +
          forcedorResponse.address.neighborhood +
          " " +
          forcedorResponse.address.complement +
          " ",
      )
      .replace(
        "[<span>supplier_address]",
        " " +
          forcedorResponse.address.publicPlace +
          " " +
          forcedorResponse.address.number +
          " " +
          forcedorResponse.address.neighborhood +
          " " +
          forcedorResponse.address.complement +
          " ",
      )
      .replace(
        "[supplier_municipality]",
        " " + forcedorResponse.address.city + " ",
      )

      .replace(/\[supplier_name\]/g, " " + forcedorResponse.name + " ")
      .replace(/\[supplier\]/g, " " + forcedorResponse.name + " ")
      .replace("[supplier_id]", " " + forcedorResponse.cpf + " ")
      .replace(/\[supplier_id\]/g, " " + forcedorResponse.cpf + " ")
      .replace(
        /\[supplier_zip_code\]/g,
        " " + forcedorResponse.address.zipCode + "",
      )
      .replace(
        /\[supplier_address\]/g,
        " " +
          forcedorResponse.address.publicPlace +
          " " +
          forcedorResponse.address.number +
          " " +
          forcedorResponse.address.neighborhood +
          " " +
          forcedorResponse.address.complement +
          " ",
      )
      .replace(
        /\[supplier_municipality\]/g,
        " " + forcedorResponse.address.city + " ",
      )
      .replace(
        /\[supplier_state\]/g,
        " " + forcedorResponse.address.state + " ",
      )

      .replace(
        /\[supplier_legal_representative_name\]/g,
        " " + forcedorResponse.legal_representative.name + " ",
      )
      .replace(
        "</span><span>supplier_legal_representative_id</span><span>",
        " " + forcedorResponse.cpf + " ",
      )
      .replace(
        /\[supplier_legal_representative_id\]/g,
        " " + forcedorResponse.legal_representative.cpf + " ",
      )
      .replace(
        "[</span><span>supplier_legal_representative_name]",
        " " +
          forcedorResponse.legal_representative.address.publicPlace +
          " " +
          forcedorResponse.legal_representative.address.number +
          " " +
          forcedorResponse.legal_representative.address.neighborhood +
          " " +
          forcedorResponse.legal_representative.address.complement +
          " ",
      )
      .replace(
        "[</span><span>supplier_legal_representative_address</span><span>]",
        " " +
          forcedorResponse.legal_representative.address.publicPlace +
          " " +
          forcedorResponse.legal_representative.address.number +
          " " +
          forcedorResponse.legal_representative.address.neighborhood +
          " " +
          forcedorResponse.legal_representative.address.complement +
          " ",
      )
      .replace(
        /\[supplier_legal_representative_address\]/g,
        " " +
          forcedorResponse.legal_representative.address.publicPlace +
          " " +
          forcedorResponse.legal_representative.address.number +
          " " +
          forcedorResponse.legal_representative.address.neighborhood +
          " " +
          forcedorResponse.legal_representative.address.complement +
          " ",
      )
      .replace(
        /\[supplier_legal_representative_address\]/g,
        " " +
          forcedorResponse.legal_representative.address.publicPlace +
          " " +
          forcedorResponse.legal_representative.address.number +
          " " +
          forcedorResponse.legal_representative.address.neighborhood +
          " " +
          forcedorResponse.legal_representative.address.complement +
          " ",
      )
      .replace(
        /\[supplier_legal_representative_supplier_municipality\]/g,
        " " + forcedorResponse.legal_representative.address.city + " ",
      )
      .replace(
        /\[supplier_legal_representative_supplier_state\]/g,
        " " + forcedorResponse.legal_representative.address.state + " ",
      )

      //DADOS ASSOCIAÇÃO

      .replace(/\[association_name\]/g, "" + respondeAssociation.name + "")
      .replace(/\[association_id\]/g, "" + respondeAssociation.cnpj + " ")
      .replace(
        /\[association_zip_code\]/g,
        "" + respondeAssociation.address.zipCode + " ",
      )
      .replace(
        /\[association_address\]/g,
        "" +
          respondeAssociation.address.publicPlace +
          " " +
          respondeAssociation.address.number +
          " " +
          respondeAssociation.address.neighborhood +
          " " +
          respondeAssociation.address.complement +
          " ",
      )

      .replace(
        /\[association_municipality\]/g,
        "" + respondeAssociation.address.city + "",
      )
      .replace(
        /\[association_state\]/g,
        "" + respondeAssociation.address.state + " ",
      )
      .replace(
        /\[association_legal_representative_name\]/g,
        "" + respondeAssociation.legalRepresentative.name + " ",
      )
      .replace(
        /\[association_legal_representative_id\]/g,
        "" + respondeAssociation.legalRepresentative.cpf + " ",
      )
      .replace(
        /\[association_legal_representative_address\]/g,
        "" +
          respondeAssociation.legalRepresentative.address.publicPlace +
          " " +
          respondeAssociation.legalRepresentative.address.number +
          " " +
          respondeAssociation.legalRepresentative.address.neighborhood +
          " " +
          respondeAssociation.legalRepresentative.address.complement +
          " ",
      )
      .replace(
        /\[association_legal_representative_supplier_municipality\]/g,
        "" + respondeAssociation.legalRepresentative.address.city + " ",
      )
      .replace(
        /\[association_legal_representative_supplier_state\]/g,
        "" + respondeAssociation.legalRepresentative.address.state + " ",
      )

      //CONVENIO
      .replace(
        /\[covenant_number\]/g,
        " " +
          contract.bid_number["agreement"]["register_number"].toString() +
          " ",
      )
      .replace(
        /\[covenant_object\]/g,
        " " +
          contract.bid_number["agreement"]["register_object"].toString() +
          " ",
      )
      .replace(
        /\[municipality_execution_covenant\]/g,
        " " + contract.bid_number["local_to_delivery"].toString() + " ",
      )

      //LICITACAO

      .replace(
        "[object_description]",
        " " + contract.bid_number["description"].toString() + " ",
      )
      .replace(
        /\[object_description\]/g,
        "" + contract.bid_number["description"].toString() + " ",
      )
      .replace(
        "[number/year_bidding]",
        " " +
          contract.bid_number["bid_count"].toString() +
          "/" +
          moment(contract.bid_number["start_at"]).format("YYYY").toString(),
      )
      .replace(/\[guest_supplier\]/g, "" + convidados + " ")
      .replace(/\[proposed_list\]/g, " " + propostas)
      .replace(
        /\[estimated_value_of_the_bid\]/g,
        " " +
          valor_estimado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      )
      .replace(
        /\[winning_supplier\]/g,
        " " + forcedorResponse.legal_representative.name + " ",
      )
      .replace(
        "[document_contract_date]",
        " " +
          moment(contract["createdAt"]).format("DD/MM/YYYY").toString() +
          " ",
      )
      .replace(
        /\[document_contract_date\]/g,
        " " +
          moment(contract["createdAt"]).format("DD/MM/YYYY").toString() +
          " ",
      )
      //.replace([document_minutes]', ' ' +
      //.replace('[document_notice_ date]', ' ' +
      .replace(
        /\[closing_date\]/g,
        " " + moment(contract["end_at"]).format("DD/MM/YYYY").toString() + " ",
      )
      .replace(
        /\[start_date\]/g,
        " " +
          moment(contract["start_at"]).format("DD/MM/YYYY").toString() +
          " ",
      )
      .replace(
        "[batch_c</font><span>omplete_list</span><span>]",
        "" + lotesCompleto + " ",
      )
      .replace("[batch_complete_list]", "" + lotesCompleto + " ")
      .replace(
        "[batch_specification</font>_list]",
        "" + lotesEspecificacao + " ",
      )
      .replace("[batch_specification_list]", "" + lotesEspecificacao + " ")
      .replace("[batch_list]", "" + lotes + " ");

    return contractFormated;
  }

  async createDocument(
    _id: string,
    lang: string = LanguageContractEnum.english,
    type: ModelContractClassificationEnum,
  ): Promise<Buffer> {
    const logger = new Logger("DocumentGenerator");

    logger.log(
      `Iniciando criação de documento - ID: ${_id}, language: ${lang}, type: ${type}`,
    );

    const modelContract =
      await this._modelContractRepository.getByContractAndLanguage(lang, type);
    logger.log(
      `Resultado da busca pelo modelo: ${modelContract?.contract || "Nenhum modelo encontrado"}`,
    );

    if (!modelContract) {
      logger.error(
        `Modelo de documento não encontrado para language=${lang}, type=${type}`,
      );
      throw new CustomHttpException(
        "Modelo de documento não encontrado",
        HttpStatus.NOT_FOUND,
      );
    }

    const modelPath = path.resolve(
      "src/shared/documents",
      modelContract.contract,
    );
    logger.log(`Caminho do modelo a ser carregado: ${modelPath}`);

    // Verifique se o arquivo do modelo existe
    if (!fs.existsSync(modelPath)) {
      throw new Error(ErrorMessages.FILE_NOT_CREATED_OR_MISSING[lang]);
    }

    const content = fs.readFileSync(modelPath, "binary");

    const zip = new PizZip(content);

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    logger.log("Modelo carregado e parser iniciado");

    const contract = await this._contractRepository.getById(_id);
    logger.log(`Contrato carregado: ${contract?._id?.toString()}`);

    const proposalArray = await this._proposalRepository.listByBid(
      contract.bid_number._id.toString(),
    );
    logger.log(`Propostas carregadas: ${proposalArray?.length}`);

    let allotment: AllotmentModel[] = [];
    contract.proposal_id.forEach((proposal) => {
      proposal.allotment.forEach((allot) => {
        allotment.push(allot);
      });
    });
    logger.log(`Lotes extraídos: ${allotment.length}`);

    const listOfItems = await this.costItensGet(allotment, proposalArray);
    logger.log(`Itens de custo carregados: ${listOfItems.length}`);

    let signature = "Assinado eletronicamente pela: ";
    let yes = "Sim";
    let no = "Não";
    switch (lang) {
      case LanguageContractEnum.english:
        signature = "Electronically signed by: ";
        yes = "Yes";
        no = "No";
        break;
      case LanguageContractEnum.spanish:
        signature = "Firmado electrónicamente por: ";
        yes = "Sí";
        no = "No";
        break;
      case LanguageContractEnum.french:
        signature = "Signé électroniquement par: ";
        yes = "Oui";
        no = "Non";
        break;
      case LanguageContractEnum.portuguese:
        signature = "Assinado eletrônico pela: ";
        yes = "Sim";
        no = "Nao";
        break;
    }

    const formatDateString =
      lang === LanguageContractEnum.english ? "MM/DD/YYYY" : "DD/MM/YYYY";

    let listOfBidPrices: any[] = [];
    if (proposalArray)
      proposalArray
        .sort(
          (a, b) => Number(a?.total_value || 0) - Number(b?.total_value || 0),
        )
        .forEach((proposal) => {
          listOfBidPrices.push({
            lot: proposal.allotment
              .map((allot) => allot.allotment_name)
              .join(", "),
            rank: listOfBidPrices.length + 1,
            bidders_name: proposal.proposedBy.supplier.name || "",
            didders_id: proposal._id.toString(),
            bid_price: proposal?.total_value || 0,
            submited_at: moment(proposal.createdAt).format(formatDateString),
            accepted:
              proposal.association_accept && proposal.reviewer_accept
                ? yes
                : no,
            justification_for_rejection: proposal.refusedBecaused || "",
            awarded_at:
              proposal.association_accept && proposal.reviewer_accept
                ? moment(proposal.acceptedRevisorAt).format(formatDateString)
                : "",
            number_contract:
              contract.contract_number +
              "/" +
              moment(contract.createdAt).format("YYYY"),
          });
        });

    logger.log(
      `Lista de preços das propostas montada: ${listOfBidPrices.length}`,
    );

    doc.render({
      process_description: contract.bid_number.description,
      bid_number:
        contract.bid_number.bid_count +
        "/" +
        moment(contract.bid_number.start_at).format("YYYY"),
      name_project: contract.contract_document,
      name_purchaser: contract.bid_number.agreement.association.name,
      purchaser_country:
        contract.bid_number.agreement.association.address.state,
      publication_date: moment(contract.bid_number.createdAt).format(
        formatDateString,
      ),
      list_of_items: listOfItems,
      list_of_bid_prices: listOfBidPrices,
      bid_opening_date: moment(contract.bid_number.start_at).format(
        formatDateString,
      ),
      email_purchaser: contract.bid_number.association.email,
      deadline_date: contract.bid_number.end_at
        ? moment(contract.bid_number.end_at).format(formatDateString)
        : "| A definir no momento da abertura da licitação |",
      website_url: contract.bid_number.aditional_site || "Sem site adicional",
      day_contract: moment(contract.createdAt).format("DD"),
      month_contract: moment(contract.createdAt).format("MM"),
      year_contract: moment(contract.createdAt).format("YYYY"),
      date_contract: moment(contract.createdAt).format(formatDateString),
      number_contract:
        contract.contract_number +
        "/" +
        moment(contract.createdAt).format("YYYY"),
      adress_purchaser:
        contract.bid_number.agreement.association.address.publicPlace +
        ", " +
        contract.bid_number.agreement.association.address.number +
        ", " +
        contract.bid_number.agreement.association.address.complement +
        ", " +
        contract.bid_number.agreement.association.address.city +
        ", " +
        contract.bid_number.agreement.association.address.state +
        ", " +
        contract.bid_number.agreement.association.address.zipCode,
      name_legal_representative_purchaser:
        contract.bid_number.agreement.association.legalRepresentative.name,
      cpf_legal_representative_purchaser:
        contract.bid_number.agreement.association.legalRepresentative.cpf,
      name_supplier: contract.supplier_id?.name || "",
      supplier_country: contract.supplier_id?.address.state,
      adress_supplier:
        contract.supplier_id?.address.publicPlace +
        ", " +
        contract.supplier_id?.address.number +
        ", " +
        contract.supplier_id?.address.complement +
        ", " +
        contract.supplier_id?.address.city +
        ", " +
        contract.supplier_id?.address.state +
        ", " +
        contract.supplier_id?.address.zipCode,
      name_legal_representative_supplier:
        contract.supplier_id?.legal_representative?.name || "",
      purchaser_cnpj: contract.bid_number.agreement.association.cnpj,
      supplier_cnpj: contract.supplier_id?.cpf,
      supplier_cpf: contract.supplier_id?.cpf,
      delivery_place: contract.bid_number.local_to_delivery,
      supplier_email: contract.supplier_id?.name,
      days_to_delivery: contract.bid_number.days_to_delivery,
      date_to_delivery: moment()
        .add(contract.bid_number.days_to_delivery, "days")
        .format(formatDateString),
      role_purchaser: "",
      role_supplier: "",
      contract_value: contract.value,
      batch_list_name: listOfItems.map((item) => item.name).toString(),
      agreement_name:
        contract.bid_number.agreement.register_number +
        "/" +
        contract.bid_number.agreement.register_object,
      agreement_number: contract.bid_number.agreement.register_number,
      signature_purchaser:
        signature +
        contract.bid_number.agreement.association.name +
        " em " +
        moment(new Date(contract.association_sign_date)).format(
          formatDateString,
        ),
      signature_supplier:
        signature +
        contract.supplier_id?.name +
        " em " +
        moment(new Date(contract.supplier_sign_date)).format(formatDateString),
      bid_concluded_date: contract.bid_number.concludedAt
        ? moment(contract.bid_number.concludedAt).format(formatDateString)
        : "",
      guest_suppliers:
        contract.bid_number.invited_suppliers
          ?.map((supplier) => supplier.name)
          .toString() || "",
      estimated_value:
        listOfItems?.reduce(
          (acc, item) => acc + Number(item?.total_value || 0),
          0,
        ) || 0,
    });

    logger.log("Documento renderizado com sucesso");

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    const outputPath = path.resolve("src/shared/documents", "output.docx");
    logger.log(`Salvando documento temporário em: ${outputPath}`);

    fs.writeFileSync(outputPath, buf);

    await this.callPythonFile()
      .then(() => {
        logger.log(
          "Documento convertido com sucesso via Python, excluindo temporário",
        );
        fs.unlinkSync(outputPath);
      })
      .catch((err) => {
        logger.error("Erro ao converter o arquivo via Python:", err);
        throw new CustomHttpException(
          "Erro ao converter o arquivo, verifique se o python está instalado e se o caminho está correto",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    logger.log("Criação de documento finalizada com sucesso");
    return buf;
  }

  async getById(_id: string): Promise<ContractModel> {
    const result = await this._contractRepository.getById(_id);
    if (result.deleted === true) {
      throw new BadRequestException("Esse contrato já foi deletado!");
    }
    return result;
  }

  async listByBidId(bid_id: string): Promise<ContractModel[]> {
    const result = await this._contractRepository.getByBidId(bid_id);
    return result;
  }

  async deleteById(_id: string) {
    return await this._contractRepository.deleteById(_id);
  }

  private async costItensGet(
    allotment: AllotmentModel[],
    proposal?: ProposalModel[],
  ): Promise<any[]> {
    let listOfItems = [];

    for (let allot of allotment) {
      let el = proposal?.find((proposal) =>
        proposal.allotment.find(
          (all) => all._id.toString() === allot._id.toString(),
        ),
      );

      let price = 0;
      let quantity = 0;

      if (el) {
        price = +el?.total_value || 0;
        quantity = +el.allotment
          .map((all) => all.quantity)
          .reduce((a, b) => Number(a) + Number(b), 0)
          .toFixed(2);
        price = +Number(price / quantity).toFixed(2);
      }

      for (let item of allot.add_item) {
        console.log("Processando item:", item.item);

        const costItems = await this._costItemsService.getByName(item.item);
        console.log("Resultado de getByName:", costItems);

        listOfItems.push({
          name: item.item,
          code: costItems?.code || item.group,
          classification: costItems?.category?.segment || "Sem classificação",
          specification: item.specification || "Sem especificação",
          quantity: item.quantity,
          unit_measure: item.unitMeasure,
          place_to_delivery: allot.place_to_delivery,
          days_to_delivery: allot.days_to_delivery,
          price_unit: price,
          total_value: price * quantity,
        });
      }
    }

    console.log("Itens de custo finais:", JSON.stringify(listOfItems, null, 2));
    return listOfItems;
  }

  private async callPythonFile() {
    return new Promise((resolve, reject): void => {
      if (!fs.existsSync(path.resolve("src/shared/documents", "output.docx"))) {
        reject("Arquivo não encontrado");
      }
      const py = platform === "win32" ? "python" : "python3";
      const soft = platform === "win32" ? "win32" : "linux";
      const python = spawn(py, [
        path.resolve("src/shared/documents", "convertPDF.py"),
        path.resolve("src/shared/documents", "output.docx"),
        path.resolve("src/shared/documents", "output.pdf"),
        soft,
      ]);
      python.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      python.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
          return resolve(0);
        }
        return reject(1);
      });

      python.on("error", (err) => {
        console.error(err);
        reject(err);
      });
    });
  }
}
