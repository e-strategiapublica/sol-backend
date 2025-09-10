import { HttpStatus } from "@nestjs/common";

/**
 * Enum que representa o erro, deve-se criar também as informações do erro em `BackendErrorsInfo`.
 * Alert: O frontend deve mapear esses erros para mensagens amigáveis ao usuário.
 */
export enum BackendErrors {
  PROPOSAL_NOT_FOUND = "PROPOSAL_NOT_FOUND",
}

export const BackendErrorsInfo = {
  [BackendErrors.PROPOSAL_NOT_FOUND]: {
    code: HttpStatus.NOT_FOUND,
    data: ["proposal_id"] as const,
  },
} satisfies Record<BackendErrors, ErrorInfoProps>;

type ErrorInfoProps = {
  code: HttpStatus;
  data: readonly string[];
};
