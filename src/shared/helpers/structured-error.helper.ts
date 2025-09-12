import { BadRequestException, HttpException } from "@nestjs/common";
import { BackendErrors, BackendErrorsInfo } from "../enums/errors";

/**
 * Helper para lançar exceções estruturadas que o frontend pode mapear
 */
export class StructuredErrorHelper {
  /**
   * Lança uma exceção estruturada com base no enum BackendErrors
   * @param errorKey Chave do erro do enum BackendErrors
   * @param data Dados para interpolação (opcional)
   */
  static throw(errorKey: BackendErrors, data: Record<string, any> = {}): never {
    const errorInfo = BackendErrorsInfo[errorKey];
    
    console.log('StructuredErrorHelper.throw - errorKey:', errorKey);
    console.log('StructuredErrorHelper.throw - data:', data);
    console.log('StructuredErrorHelper.throw - errorInfo:', errorInfo);
    
    if (!errorInfo) {
      console.log('StructuredErrorHelper.throw - errorInfo not found, throwing generic error');
      throw new BadRequestException({
        error: BackendErrors.GENERIC_ERROR,
        data: {}
      });
    }

    const errorResponse = {
      error: errorKey,
      data: data
    };

    console.log('StructuredErrorHelper.throw - errorResponse:', errorResponse);
    console.log('StructuredErrorHelper.throw - throwing HttpException with code:', errorInfo.code);

    // Criar uma exceção customizada que preserve a estrutura
    const customError = new HttpException(errorResponse, errorInfo.code);
    // Marcar como erro estruturado para que interceptadores possam identificar
    (customError as any).isStructuredError = true;
    
    throw customError;
  }

  /**
   * Lança erro de proposta não encontrada
   * @param proposalId ID da proposta
   */
  static throwProposalNotFound(proposalId: string): never {
    this.throw(BackendErrors.PROPOSAL_NOT_FOUND, { proposal_id: proposalId });
  }

  /**
   * Lança erro de proposta já deletada
   * @param proposalId ID da proposta
   */
  static throwProposalAlreadyDeleted(proposalId: string): never {
    this.throw(BackendErrors.PROPOSAL_ALREADY_DELETED, { proposal_id: proposalId });
  }

  /**
   * Lança erro de licitação não encontrada
   * @param bidId ID da licitação
   */
  static throwBidNotFound(bidId: string): never {
    this.throw(BackendErrors.BID_NOT_FOUND, { bid_id: bidId });
  }

  /**
   * Lança erro de licitação fechada
   * @param bidId ID da licitação
   */
  static throwBidClosed(bidId: string): never {
    this.throw(BackendErrors.BID_CLOSED, { bid_id: bidId });
  }

  /**
   * Lança erro de associação não encontrada
   * @param associationId ID da associação
   */
  static throwAssociationNotFound(associationId: string): never {
    this.throw(BackendErrors.ASSOCIATION_NOT_FOUND, { association_id: associationId });
  }

  /**
   * Lança erro de convênio não encontrado
   * @param agreementId ID do convênio
   */
  static throwAgreementNotFound(agreementId: string): never {
    this.throw(BackendErrors.AGREEMENT_NOT_FOUND, { agreement_id: agreementId });
  }

  /**
   * Lança erro de usuário não encontrado
   * @param userId ID do usuário
   */
  static throwUserNotFound(userId: string): never {
    this.throw(BackendErrors.USER_NOT_FOUND, { user_id: userId });
  }

  /**
   * Lança erro de fornecedor não encontrado
   * @param supplierId ID do fornecedor
   */
  static throwSupplierNotFound(supplierId: string): never {
    this.throw(BackendErrors.SUPPLIER_NOT_FOUND, { supplier_id: supplierId });
  }

  /**
   * Lança erro de lote não encontrado
   * @param allotmentId ID do lote
   */
  static throwAllotmentNotFound(allotmentId: string): never {
    this.throw(BackendErrors.ALLOTMENT_NOT_FOUND, { allotment_id: allotmentId });
  }

  /**
   * Lança erro de arquivo não encontrado
   * @param fileId ID do arquivo
   */
  static throwFileNotFound(fileId: string): never {
    this.throw(BackendErrors.FILE_NOT_FOUND, { file_id: fileId });
  }

  /**
   * Lança erro de campos obrigatórios ausentes
   * @param missingFields Array com os campos ausentes
   */
  static throwMissingRequiredFields(missingFields: string[]): never {
    this.throw(BackendErrors.MISSING_REQUIRED_FIELDS, { fields: missingFields.join(", ") });
  }

  /**
   * Lança erro quando não é possível aceitar lote em análise
   * @param allotmentId ID do lote
   */
  static throwCannotAcceptAllotmentInAnalysis(allotmentId: string): never {
    this.throw(BackendErrors.CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS, { allotment_id: allotmentId });
  }

  /**
   * Lança erro genérico
   */
  static throwGenericError(): never {
    this.throw(BackendErrors.GENERIC_ERROR);
  }
}
