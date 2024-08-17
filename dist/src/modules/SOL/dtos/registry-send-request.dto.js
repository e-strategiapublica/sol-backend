"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrySendRequestDto = void 0;
class RegistrySendRequestDto {
    constructor(id, description, agreement, classification, start_at, end_at, days_to_tiebreaker, days_to_delivery, local_to_delivery, bid_type, modality, aditional_site, add_allotment, invited_suppliers, bid_count, state, city, status, association, createdAt) {
        this.id = id;
        this.description = description;
        this.agreement = agreement;
        this.classification = classification;
        this.start_at = start_at;
        this.end_at = end_at;
        this.days_to_tiebreaker = days_to_tiebreaker;
        this.days_to_delivery = days_to_delivery;
        this.local_to_delivery = local_to_delivery;
        this.bid_type = bid_type;
        this.modality = modality;
        this.aditional_site = aditional_site;
        this.add_allotment = add_allotment;
        this.invited_suppliers = invited_suppliers;
        this.bid_count = bid_count;
        this.state = state;
        this.city = city;
        this.status = status;
        this.association = association;
        this.createdAt = createdAt;
    }
}
exports.RegistrySendRequestDto = RegistrySendRequestDto;
//# sourceMappingURL=registry-send-request.dto.js.map