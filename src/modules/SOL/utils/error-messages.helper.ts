export const ProposalErrorMessages = {
  // Proposal not found
  PROPOSAL_NOT_FOUND: "Proposta não encontrada!",

  // Proposal already deleted
  PROPOSAL_ALREADY_DELETED: "Esse contrato já foi deletado!",

  // Registration errors
  BID_CLOSED: "Não é possivel cadastrar proposta para licitação fechada!",
  REGISTRATION_FAILED: "Não foi possivel cadastrar essa proposta!",
  DUPLICATE_PROPOSAL: "Já foi enviado uma proposta para essa licitação!",

  // Allotment analysis errors
  CANNOT_REFUSE_ALLOTMENT_IN_ANALYSIS:
    "Não é possível recusar propostas enquanto o lote está em análise.",
  CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS:
    "Não é possível aceitar propostas enquanto o lote está em análise.",
} as const;

export type ProposalErrorMessageKey = keyof typeof ProposalErrorMessages;
