/**
 * Utility functions to safely extract IDs from entities that may be populated or not
 */

/**
 * Extracts ID from a bid entity that can be either a string ID or a populated object
 * @param bid - The bid entity (string ID or populated object)
 * @returns The bid ID as string
 */
export function extractBidId(bid: any): string {
  if (typeof bid === "string") {
    return bid;
  }

  if (bid && typeof bid === "object") {
    return bid._id?.toString() || bid.id?.toString();
  }

  throw new Error("Invalid bid entity: cannot extract ID");
}

/**
 * Extracts ID from a supplier entity that can be either a string ID or a populated object
 * @param supplier - The supplier entity (string ID or populated object)
 * @returns The supplier ID as string
 */
export function extractSupplierId(supplier: any): string {
  if (typeof supplier === "string") {
    return supplier;
  }

  if (supplier && typeof supplier === "object") {
    return supplier._id?.toString() || supplier.id?.toString();
  }

  throw new Error("Invalid supplier entity: cannot extract ID");
}

/**
 * Extracts ID from any entity that can be either a string ID or a populated object
 * @param entity - The entity (string ID or populated object)
 * @returns The entity ID as string
 */
export function extractEntityId(entity: any): string {
  if (typeof entity === "string") {
    return entity;
  }

  if (entity && typeof entity === "object") {
    return entity._id?.toString() || entity.id?.toString();
  }

  throw new Error("Invalid entity: cannot extract ID");
}
