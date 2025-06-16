import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ModelContractRepository } from "../repositories/model-contract.repository";
import { ModelContractRegisterDto } from "../dtos/model-contract-register-request.dto";
import { ModelContractUpdateDto } from "../dtos/model-contract-update-request.dto";
import { BidRepository } from "../repositories/bid.repository";
import { ModelContractModel } from "../models/model-contract.model";
import { BidModel } from "../models/bid.model";
import sanitizeFilename from "sanitize-filename";
import * as fs from "fs";
import * as path from "path";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";

@Injectable()
export class ModelContractService {
  private readonly _logger = new Logger(ModelContractService.name);
  private readonly documentsPath = path.resolve("src/shared/documents");

  constructor(
    private readonly _modelContractRepository: ModelContractRepository,
    private readonly _bidsRepository: BidRepository,
  ) {}

  private getDocumentFilePath(filename: string): string {
    const sanitizedFilename = sanitizeFilename(filename);
    const fullPath = path.resolve(this.documentsPath, sanitizedFilename);
    if (!fullPath.startsWith(this.documentsPath)) {
      this._logger.error({ full_path: fullPath }, "invalid file path");
      throw new CustomHttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return fullPath;
  }

  async register(
    dto: ModelContractRegisterDto,
    file: Express.Multer.File,
  ): Promise<ModelContractModel> {
    const modelContract =
      await this._modelContractRepository.getByContractAndLanguage(
        dto.language,
        dto.classification,
      );

    if (modelContract) {
      throw new BadRequestException(
        "Já existe um modelo de contrato cadastrado com essas informações!",
      );
    }

    const filePath = this.getDocumentFilePath(file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    dto.contract = file.originalname;

    const result = await this._modelContractRepository.register(dto);
    if (!result)
      throw new BadRequestException(
        "Não foi possivel cadastrar esse modelo de contrato!",
      );

    return result;
  }

  async list(): Promise<ModelContractModel[]> {
    const result = await this._modelContractRepository.list();
    return result;
  }

  async update(
    _id: string,
    dto: ModelContractUpdateDto,
    file: Express.Multer.File,
  ): Promise<ModelContractModel> {
    const modelContract =
      await this._modelContractRepository.getByContractAndLanguage(
        dto.language,
        dto.classification,
      );

    if (modelContract) {
      if (modelContract._id != _id)
        throw new BadRequestException(
          "Já existe um modelo de contrato cadastrado com essas informações!",
        );
    }
    if (fs.existsSync(this.documentsPath)) {
      fs.unlinkSync(this.documentsPath);
    }

    const filePath = this.getDocumentFilePath(file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    dto.contract = file.originalname;

    const result = await this._modelContractRepository.update(_id, dto);
    return result;
  }

  async getById(_id: string): Promise<ModelContractModel> {
    const result = await this._modelContractRepository.getById(_id);

    return result;
  }

  async getBidById(_id: string): Promise<BidModel> {
    const result = await this._bidsRepository.getBidById(_id);
    if (!result) {
      throw new BadRequestException("Licitação não encontrada!");
    }
    return result;
  }

  async deleteById(_id: string) {
    return await this._modelContractRepository.deleteById(_id);
  }
}
