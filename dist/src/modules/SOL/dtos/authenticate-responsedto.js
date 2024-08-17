"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateResponseDto = void 0;
class AuthenticateResponseDto {
    constructor(email, name, id, token, refreshToken, type, roles) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.token = token;
        this.refreshToken = refreshToken;
        this.type = type;
        this.roles = roles;
    }
}
exports.AuthenticateResponseDto = AuthenticateResponseDto;
//# sourceMappingURL=authenticate-responsedto.js.map