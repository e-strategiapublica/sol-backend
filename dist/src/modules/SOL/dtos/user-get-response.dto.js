"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetResponseDto = void 0;
class UserGetResponseDto {
    constructor(_id, name, email, phone, status, document, profilePicture, office, association, supplier, roles, notification_list) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.document = document;
        this.profilePicture = profilePicture;
        this.office = office;
        this.association = association;
        this.supplier = supplier;
        this.roles = roles;
        this.notification_list = notification_list;
    }
}
exports.UserGetResponseDto = UserGetResponseDto;
//# sourceMappingURL=user-get-response.dto.js.map