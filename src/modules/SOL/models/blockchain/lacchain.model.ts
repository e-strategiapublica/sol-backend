import { HttpStatus, Inject, Injectable, Logger, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import { firstValueFrom } from "rxjs";
import { EnviromentVariablesEnum as ENV } from "../../../../shared/enums/enviroment.variables.enum";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";
import {
  GetBidDataResponse,
  SetBidDataPayload,
  SetBidDataResponse,
} from "./types";

@Injectable({ scope: Scope.REQUEST })
export class LacchainModel {
  private readonly logger = new Logger(LacchainModel.name);
  private readonly baseUrl: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>(ENV.LACCHAIN_NODE_URL);
  }

  private getHeaders() {
    const headers = this.request.headers;
    const token = headers["authorization"];
    return {
      Authorization: token,
    };
  }

  /**
   * Obtém dados de uma licitação na blockchain
   * @param bidHistoryId ID do histórico da licitação
   * @returns Dados da licitação na blockchain
   */
  public async getBidData(bidHistoryId: string): Promise<GetBidDataResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GetBidDataResponse>(
          `${this.baseUrl}/api/bid/${bidHistoryId}`,
          { headers: this.getHeaders() },
        ),
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error({
          error: error.response,
        });
        throw new CustomHttpException(
          "Erro ao buscar dados do Bid na Lacchain",
          HttpStatus.BAD_GATEWAY,
        );
      }
      throw error;
    }
  }

  /**
   * Registra dados de uma licitação na blockchain
   * @param token Token de autenticação
   * @param bidHistoryId ID do histórico da licitação
   * @param hash Hash dos dados da licitação
   * @returns Hash da transação ou hash zero em caso de erro
   */
  public async setBidData(payload: SetBidDataPayload): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<SetBidDataResponse>(
          `${this.baseUrl}/api/bid/setData`,
          payload,
          { headers: this.getHeaders() },
        ),
      );
      console.log({ response });
      return response.data.txHash;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error({
          code: error.code,
          error_data: error.response?.data,
          status_code: error.response?.status,
          message: "erro ao gravar dados do Bid na Lacchain",
        });
        return "FAIL_TO_SET_BID_DATA_IN_LACCHAIN";
      }
      throw error;
    }
  }
}
