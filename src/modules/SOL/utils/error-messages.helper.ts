export const ProposalErrorMessages = {
  // Proposal not found
  PROPOSAL_NOT_FOUND: "PROPOSAL_NOT_FOUND",

  // Proposal already deleted
  PROPOSAL_ALREADY_DELETED: "PROPOSAL_ALREADY_DELETED",

  // Registration errors
  BID_CLOSED: "BID_CLOSED",
  REGISTRATION_FAILED: "REGISTRATION_FAILED",
  DUPLICATE_PROPOSAL: "DUPLICATE_PROPOSAL",

  // Allotment analysis errors
  CANNOT_REFUSE_ALLOTMENT_IN_ANALYSIS: "CANNOT_REFUSE_ALLOTMENT_IN_ANALYSIS",
  CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS: "CANNOT_ACCEPT_ALLOTMENT_IN_ANALYSIS",
} as const;

export type ProposalErrorMessageKey = keyof typeof ProposalErrorMessages;
