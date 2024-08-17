import { VerificationRepository } from "../repositories/verification.repository";
import { EmailService } from "src/shared/services/email.service";
import { UserGetResponseDto } from "../dtos/user-get-response.dto";
import { UserRepository } from "../repositories/user.repository";
import { VerificationRegisterResponseDto } from "../dtos/vertification-register-response.dto";
import { UserModel } from "../models/user.model";
import { UserResetPasswordResendEmailRequestDto } from "../dtos/user-reset-password-resend-email-request.dto";
import { UserResetPasswordResendEmailResponseDto } from "../dtos/user-reset-password-resend-email-response.dto";
import { UserRegisterResendEmailRequestDto } from "../dtos/user-register-resend-email-request.dto";
export declare class VerificationService {
    private readonly emailService;
    private readonly verificationRepository;
    private readonly userRepository;
    private readonly logger;
    constructor(emailService: EmailService, verificationRepository: VerificationRepository, userRepository: UserRepository);
    send(user: UserGetResponseDto): Promise<VerificationRegisterResponseDto>;
    sendRegister(user: UserGetResponseDto): Promise<VerificationRegisterResponseDto>;
    resendResetPasswordEmail(dto: UserResetPasswordResendEmailRequestDto): Promise<UserResetPasswordResendEmailResponseDto>;
    resendCodeRegisterEmail(dto: UserRegisterResendEmailRequestDto): Promise<UserResetPasswordResendEmailResponseDto>;
    verifyCode(user: UserModel, code: number): Promise<any>;
    sendFirstAcess(user: UserGetResponseDto): Promise<VerificationRegisterResponseDto>;
    private incrementAttempt;
    private sendVerificationEmail;
}
