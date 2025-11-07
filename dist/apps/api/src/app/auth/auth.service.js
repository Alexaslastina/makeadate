"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const user_schema_1 = require("../users/schemas/user.schema");
const password_reset_token_schema_1 = require("./schemas/password-reset-token.schema");
let AuthService = class AuthService {
    constructor(userModel, resetTokenModel) {
        this.userModel = userModel;
        this.resetTokenModel = resetTokenModel;
    }
    async login(dto) {
        const user = await this.userModel.findOne({ email: dto.email.toLowerCase().trim() }).lean();
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        // Return user without password hash
        const userObj = { ...user };
        delete userObj.passwordHash;
        // Simple token (in production, use JWT)
        const access_token = Buffer.from(`${user._id}:${user.email}`).toString('base64');
        return {
            user: userObj,
            access_token,
        };
    }
    async requestPasswordReset(email) {
        const user = await this.userModel.findOne({ email: email.toLowerCase().trim() }).lean();
        // Don't reveal if user exists or not (security best practice)
        if (!user) {
            return { message: 'If an account with that email exists, a password reset link has been sent.' };
        }
        // Generate secure token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // Token valid for 1 hour
        // Delete any existing tokens for this user
        await this.resetTokenModel.deleteMany({ userId: user._id });
        // Create new reset token
        await this.resetTokenModel.create({
            userId: user._id,
            token,
            expiresAt,
            used: false,
        });
        // TODO: Send email with reset link
        // For now, we'll return the token in the response (remove this in production!)
        // In production, send email with link: http://localhost:4200/reset-password?token=${token}
        const resetLink = `http://localhost:4200/reset-password?token=${token}`;
        console.log(`\n🔐 Password Reset Link for ${email}:`);
        console.log(resetLink);
        console.log(`\n⚠️  In production, send this link via email instead!\n`);
        return {
            message: 'If an account with that email exists, a password reset link has been sent.',
            // Remove this in production - only for development/testing
            resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined
        };
    }
    async resetPassword(token, newPassword) {
        // Find token
        const resetToken = await this.resetTokenModel.findOne({ token }).populate('userId');
        if (!resetToken) {
            throw new common_1.NotFoundException('Invalid or expired reset token');
        }
        // Check if token is used
        if (resetToken.used) {
            throw new common_1.BadRequestException('This reset token has already been used');
        }
        // Check if token is expired
        if (new Date() > resetToken.expiresAt) {
            throw new common_1.BadRequestException('Reset token has expired. Please request a new one.');
        }
        // Hash new password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        // Update user password
        await this.userModel.findByIdAndUpdate(resetToken.userId, { passwordHash });
        // Mark token as used
        resetToken.used = true;
        await resetToken.save();
        return { message: 'Password has been successfully reset' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserEntity.name)),
    __param(1, (0, mongoose_1.InjectModel)(password_reset_token_schema_1.PasswordResetTokenEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map