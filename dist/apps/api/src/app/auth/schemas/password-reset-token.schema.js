"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = exports.PasswordResetTokenSchema = exports.PasswordResetTokenEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PasswordResetTokenEntity = class PasswordResetTokenEntity {
};
exports.PasswordResetTokenEntity = PasswordResetTokenEntity;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UserEntity', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PasswordResetTokenEntity.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], PasswordResetTokenEntity.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now, expires: 3600 }) // Expires in 1 hour
    ,
    __metadata("design:type", Date)
], PasswordResetTokenEntity.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], PasswordResetTokenEntity.prototype, "used", void 0);
exports.PasswordResetTokenEntity = PasswordResetTokenEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'password_reset_tokens', timestamps: true })
], PasswordResetTokenEntity);
exports.PasswordResetTokenSchema = mongoose_1.SchemaFactory.createForClass(PasswordResetTokenEntity);
// Alias for consistency
exports.PasswordResetToken = PasswordResetTokenEntity;
//# sourceMappingURL=password-reset-token.schema.js.map