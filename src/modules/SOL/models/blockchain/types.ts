export type SetBidDataPayload = {
  bidHistoryId: string;
  hash: string;
};

export type SetBidDataResponse = {
  txHash: string;
};

export type GetBidDataResponse = {
  exist: boolean;
  txHash: string;
};
