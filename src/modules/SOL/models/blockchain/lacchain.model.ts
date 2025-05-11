import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import { firstValueFrom } from "rxjs";
import { EnviromentVariablesEnum } from "../../../../shared/enums/enviroment.variables.enum";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";
import {
  GetBidDataResponse,
  SetBidDataPayload,
  SetBidDataResponse,
} from "./types";
@Injectable()
export class LacchainModel {
  private readonly logger = new Logger(LacchainModel.name);
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>(
      EnviromentVariablesEnum.LACCHAIN_NODE_URL,
    );
  }

  private getHeaders() {
    const token = "";
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
          `${this.baseUrl}/api/lacchain/bid/setData`,
          payload,
          { headers: this.getHeaders() },
        ),
      );
      return response.data.txHash;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error({
          error: error.response,
        });
        throw new CustomHttpException(
          "Erro ao setar dados do Bid na Lacchain",
          HttpStatus.BAD_GATEWAY,
        );
      }
      throw error;
    }
  }
}
