import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Headers,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { UserController } from "./user.controller";
import { BideRegisterDto } from "../dtos/bid-register-request.dto";
import { BidService } from "../services/bid.service";
import { BidUpdateDto } from "../dtos/bid-update-request.dto";
import { JwtPayload } from "src/shared/interfaces/jwt-payload.interface";
import { BidUpdateStatusRequestDto } from "../dtos/bid-update-status-request.dto";
import { FuncoesGuard } from "src/shared/guards/funcoes.guard";
import { Funcoes } from "src/shared/decorators/function.decorator";
import { UserTypeEnum } from "../enums/user-type.enum";
import { BidAddProposalDto } from "../dtos/bid-add-proposal.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { BidDateUpdateDto } from "../dtos/bid-date-update.dto";
import { LacchainModel } from "../models/blockchain/lacchain.model";
import { BidHistoryModel } from "../models/database/bid_history.model";
import { ErrorManager } from "../../../shared/utils/error.manager";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
const path = require("path");
import * as fs from "fs";
import { EnviromentVariablesEnum } from "src/shared/enums/enviroment.variables.enum";

@ApiTags("bid")
@Controller("bid")
export class BidController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly bidsService: BidService,
    private _lacchainModel: LacchainModel,
    private _bidHistoryModel: BidHistoryModel,
    private readonly configService: ConfigService,
  ) { }

  @Post("register")
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    AnyFilesInterceptor({ limits: { fieldSize: 50 * 1024 * 1024 } }),
  )
  async register(
    @Req() request,
    @Body() dto: BideRegisterDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers("authorization") authorizationHeader: string,
  ) {
    try {
      const [bearer, token] = authorizationHeader.split(" ");

      const payload: JwtPayload = request.user;
      const response = await this.bidsService.register(
        token,
        payload.userId,
        dto,
        files,
      );

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async list() {
    try {
      const response = await this.bidsService.list();

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-for-supplier")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listForSupplier(@Req() request) {
    try {
      const payload: JwtPayload = request.user;

      const response = await this.bidsService.listForSupplier(payload.userId);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-for-proposal-supplier")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listForProposalSupplier(@Req() request) {
    try {
      const payload: JwtPayload = request.user;

      const response = await this.bidsService.listForProposalSupplier(
        payload.userId,
      );

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("get-by-id/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getById(@Param("_id") _id: string) {
    try {
      const response = await this.bidsService.getById(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-allotment-by/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listAllotmentBydBidId(@Param("_id") _id: string) {
    try {
      const response = await this.bidsService.listAllotmentBydBidId(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-bid-by-manager-reviewer/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async getByManagerOrRevieweId(@Param("_id") _id: string) {
    try {
      const response =
        await this.bidsService.findAgreementByReviewerOrManagerId(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-bid-by-reviewer/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAgreementByReviewerId(@Param("_id") _id: string) {
    try {
      const response = await this.bidsService.findAgreementByReviewerId(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-bid-by-viewer/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAgreementByViewerId(@Param("_id") _id: string) {
    try {
      const response = await this.bidsService.findAgreementByViewerId(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-bid-by-manager/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAgreementByProjectManagerId(@Param("_id") _id: string) {
    try {
      const response =
        await this.bidsService.findAgreementByProjectManagerId(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("list-by-association")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async listBydAssociation(@Req() request) {
    try {
      const payload: JwtPayload = request.user;

      const response = await this.bidsService.listByAssociation(payload.userId);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put("update/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateById(@Param("_id") _id: string, @Body() dto: BidUpdateDto) {
    try {
      const response = await this.bidsService.update(_id, dto);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put("update-open-date/")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateOpenDate(
    @Param("_id") _id: string,
    @Body() dto: BidDateUpdateDto,
  ) {
    try {
      const response = await this.bidsService.updateOpenDate(dto);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put("change-status/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(
    UserTypeEnum.administrador,
    UserTypeEnum.associacao,
    UserTypeEnum.project_manager,
  )
  @ApiBearerAuth()
  async updateStatus(
    @Param("_id") _id: string,
    @Body() dto: BidUpdateStatusRequestDto,
    @Req() request,
    @Headers("authorization") authorizationHeader: string,
  ) {
    try {
      const [bearer, token] = authorizationHeader.split(" ");
      const payload: JwtPayload = request.user;
      const response = await this.bidsService.updateStatus(
        token,
        payload.userId,
        _id,
        dto,
      );

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put("add-proposal/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao)
  @ApiBearerAuth()
  async addProposal(@Param("_id") _id: string, @Body() dto: BidAddProposalDto) {
    try {
      const response = await this.bidsService.addProposal(_id, dto);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete("delete-by-id/:_id")
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao)
  async deleteById(@Param("_id") _id: string) {
    try {
      const result = await this.bidsService.deleteById(_id);

      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("download/:id/:type")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async download(
    @Res() response,
    @Param("id") id: string,
    @Param("type") type: string,
  ) {
    try {
      const result = await this.bidsService.downloadFile(id, type);

      response.send(result);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("bid-pdf/:id/:type")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @ApiBearerAuth()
  async bidPdf(@Param("id") id: string, @Param("type") type: string) {
    try {
      const result = await this.bidsService.bidPdfDownload(id, type);
      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("create-document/:_id/:language/:type")
  @HttpCode(200)
  async createDocument(
    @Param("_id") _id: string,
    @Param("language") language: string,
    @Param("type") type: string,
    @Res() res: Response,
    ) {
    try {
      this.logger.log(`Recebida requisição para criar documento: _id=${_id}, language=${language}, type=${type}`);

      await this.bidsService.createDocument(_id, language, type as any);

      const filePath = path.resolve("src/shared/documents", "output.pdf");
      this.logger.log(`Tentando enviar arquivo: ${filePath}`);

      if (!fs.existsSync(filePath)) {
        this.logger.error(`Arquivo não encontrado: ${filePath}`);
        throw new HttpException(
          new ResponseDto(false, null, [`Arquivo não encontrado: ${filePath}`]),
          HttpStatus.BAD_REQUEST
        );
      }

      res.sendFile(filePath, {}, (err) => {
        if (err) {
          this.logger.error(`Erro ao enviar arquivo: ${err.message}`);
          throw new HttpException(
            new ResponseDto(false, null, [err.message]),
            HttpStatus.BAD_REQUEST
          );
        }
        this.logger.log(`Arquivo enviado com sucesso: ${filePath}`);

        // Deletar o arquivo após envio
        try {
          fs.unlinkSync(filePath);
          this.logger.log(`Arquivo deletado após envio: ${filePath}`);
        } catch (unlinkErr) {
          this.logger.error(`Erro ao deletar arquivo: ${unlinkErr.message}`);
        }
      });
    } catch (error) {
      this.logger.error(`Erro na geração do documento: ${error.message}`);
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("report")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async report(@Param("id") id: string) {
    try {
      const response = await this.bidsService.report();

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("lacchain/getBidData/:bidId")
  @HttpCode(200)
  async getBidData(@Req() request, @Param("bidId") bidId: string) {
    try {
      const bidsHistory = await this._bidHistoryModel.listByBidId(bidId);
      let hash;
      let res, fieldSaved;

      if (bidsHistory.length > 0) {
        for (let i = 0; i < bidsHistory.length; i++) {
          hash = await this.bidsService.calculateHash(bidsHistory[i].data);

          const sendToBlockchain = this.configService.get(EnviromentVariablesEnum.BLOCKCHAIN_ACTIVE);
          if (sendToBlockchain && sendToBlockchain == "true") {
            res = await this._lacchainModel.getBidData(
              bidsHistory[i]._id.toHexString(),
            );
          }

          bidsHistory[i].hash = hash;

          if (!res) {
            bidsHistory[i].verifiedByLacchain = { result: false, hash: "" };
          } else if (res[0] == true) {
            if (hash == res[1]) {
              bidsHistory[i].verifiedByLacchain = {
                result: true,
                hash: res[1],
              };
            } else {
              bidsHistory[i].verifiedByLacchain = {
                result: false,
                hash: res[1],
              };
            }
          } else {
            bidsHistory[i].verifiedByLacchain = { result: false, hash: res[1] };
          }
        }
      } else {
        return { type: "error", message: "A licitação não existe" }; // Ajustei a mensagem de erro
      }

      return bidsHistory;
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }
}
