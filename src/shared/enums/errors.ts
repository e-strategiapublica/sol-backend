import { HttpStatus } from "@nestjs/common";

/**
 * Enum que representa o erro, deve-se criar também as informações do erro em `BackendErrorsInfo`.
 * Alert: O frontend deve mapear esses erros para mensagens amigáveis ao usuário.
 */
export enum BackendErrors {
  // Proposal errors
  PROPOSAL_NOT_FOUND = "PROPOSAL_NOT_FOUND",
  PROPOSAL_ALREADY_DELETED = "PROPOSAL_ALREADY_DELETED",
  PROPOSAL_REGISTRATION_FAILED = "PROPOSAL_REGISTRATION_FAILED",
  PROPOSAL_UPDATE_FAILED = "PROPOSAL_UPDATE_FAILED",

  // Bid errors
  BID_NOT_FOUND = "BID_NOT_FOUND",
  BID_CLOSED = "BID_CLOSED",
  BID_REGISTRATION_FAILED = "BID_REGISTRATION_FAILED",
  BID_UPDATE_FAILED = "BID_UPDATE_FAILED",
  BID_NOT_IN_ANALYSIS = "BID_NOT_IN_ANALYSIS",
  BID_NO_PROPOSALS_FOR_TIE_BREAKER = "BID_NO_PROPOSALS_FOR_TIE_BREAKER",
  BID_MISSING_ALLOTMENTS = "BID_MISSING_ALLOTMENTS",
  BID_INVALID_STATUS = "BID_INVALID_STATUS",
  BID_DOCUMENT_GENERATION_FAILED = "BID_DOCUMENT_GENERATION_FAILED",
  BID_DOWNLOAD_FAILED = "BID_DOWNLOAD_FAILED",
  BID_UNAUTHORIZED_ACCESS = "BID_UNAUTHORIZED_ACCESS",

  // Association errors
  ASSOCIATION_NOT_FOUND = "ASSOCIATION_NOT_FOUND",
  ASSOCIATION_REGISTRATION_FAILED = "ASSOCIATION_REGISTRATION_FAILED",

  // Agreement errors
  AGREEMENT_NOT_FOUND = "AGREEMENT_NOT_FOUND",

  // User errors
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_REGISTRATION_FAILED = "USER_REGISTRATION_FAILED",
  USER_UPDATE_FAILED = "USER_UPDATE_FAILED",
  USER_EMAIL_ALREADY_EXISTS = "USER_EMAIL_ALREADY_EXISTS",
  USER_INVALID_CREDENTIALS = "USER_INVALID_CREDENTIALS",
  USER_PASSWORD_UPDATE_FAILED = "USER_PASSWORD_UPDATE_FAILED",
  USER_VERIFICATION_CODE_INVALID = "USER_VERIFICATION_CODE_INVALID",
  USER_VERIFICATION_CODE_EXPIRED = "USER_VERIFICATION_CODE_EXPIRED",

  // Supplier errors
  SUPPLIER_NOT_FOUND = "SUPPLIER_NOT_FOUND",
  SUPPLIER_NO_BIDS = "SUPPLIER_NO_BIDS",

  // Allotment errors
  ALLOTMENT_NOT_FOUND = "ALLOTMENT_NOT_FOUND",
  ALLOTMENT_REGISTRATION_FAILED = "ALLOTMENT_REGISTRATION_FAILED",
  ALLOTMENT_UNDER_ANALYSIS = "ALLOTMENT_UNDER_ANALYSIS",
  CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS = "CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS",

  // File errors
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  FILE_CONVERSION_ERROR = "FILE_CONVERSION_ERROR",

  // Platform errors
  PLATFORM_CONFIG_NOT_FOUND = "PLATFORM_CONFIG_NOT_FOUND",

  // Generic errors
  MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
  GENERIC_ERROR = "GENERIC_ERROR",
}

export const BackendErrorsInfo = {
  // Proposal errors
  [BackendErrors.PROPOSAL_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["proposal_id"] as const,
  },
  [BackendErrors.PROPOSAL_ALREADY_DELETED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["proposal_id"] as const,
  },
  [BackendErrors.PROPOSAL_REGISTRATION_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },
  [BackendErrors.PROPOSAL_UPDATE_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["proposal_id"] as const,
  },

  // Bid errors
  [BackendErrors.BID_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_CLOSED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_REGISTRATION_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },
  [BackendErrors.BID_UPDATE_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_NOT_IN_ANALYSIS]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_NO_PROPOSALS_FOR_TIE_BREAKER]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_MISSING_ALLOTMENTS]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },
  [BackendErrors.BID_INVALID_STATUS]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["bid_id", "status"] as const,
  },
  [BackendErrors.BID_DOCUMENT_GENERATION_FAILED]: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: ["bid_id"] as const,
  },
  [BackendErrors.BID_DOWNLOAD_FAILED]: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: ["bid_id", "file_type"] as const,
  },
  [BackendErrors.BID_UNAUTHORIZED_ACCESS]: {
    code: HttpStatus.FORBIDDEN,
    data: ["bid_id"] as const,
  },

  // Association errors
  [BackendErrors.ASSOCIATION_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["association_id"] as const,
  },
  [BackendErrors.ASSOCIATION_REGISTRATION_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },

  // Agreement errors
  [BackendErrors.AGREEMENT_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["agreement_id"] as const,
  },

  // User errors
  [BackendErrors.USER_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["user_id"] as const,
  },
  [BackendErrors.USER_REGISTRATION_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },
  [BackendErrors.USER_UPDATE_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["user_id"] as const,
  },
  [BackendErrors.USER_EMAIL_ALREADY_EXISTS]: {
    code: HttpStatus.CONFLICT,
    data: ["email"] as const,
  },
  [BackendErrors.USER_INVALID_CREDENTIALS]: {
    code: HttpStatus.UNAUTHORIZED,
    data: [] as const,
  },
  [BackendErrors.USER_PASSWORD_UPDATE_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["user_id"] as const,
  },
  [BackendErrors.USER_VERIFICATION_CODE_INVALID]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["code"] as const,
  },
  [BackendErrors.USER_VERIFICATION_CODE_EXPIRED]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["code"] as const,
  },

  // Supplier errors
  [BackendErrors.SUPPLIER_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["supplier_id"] as const,
  },
  [BackendErrors.SUPPLIER_NO_BIDS]: {
    code: HttpStatus.NOT_FOUND,
    data: ["supplier_id"] as const,
  },

  // Allotment errors
  [BackendErrors.ALLOTMENT_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["allotment_id"] as const,
  },
  [BackendErrors.ALLOTMENT_REGISTRATION_FAILED]: {
    code: HttpStatus.BAD_REQUEST,
    data: [] as const,
  },
  [BackendErrors.ALLOTMENT_UNDER_ANALYSIS]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["allotment_id"] as const,
  },
  [BackendErrors.CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["allotment_id"] as const,
  },

  // File errors
  [BackendErrors.FILE_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["file_id"] as const,
  },
  [BackendErrors.FILE_CONVERSION_ERROR]: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: [] as const,
  },

  // Platform errors
  [BackendErrors.PLATFORM_CONFIG_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: [] as const,
  },

  // Generic errors
  [BackendErrors.MISSING_REQUIRED_FIELDS]: {
    code: HttpStatus.BAD_REQUEST,
    data: ["fields"] as const,
  },
  [BackendErrors.GENERIC_ERROR]: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: [] as const,
  },
} satisfies Record<BackendErrors, ErrorInfoProps>;

type ErrorInfoProps = {
  code: HttpStatus;
  data: readonly string[];
};
