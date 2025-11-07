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
exports.Favorite = exports.FavoriteSchema = exports.FavoriteEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FavoriteEntity = class FavoriteEntity {
};
exports.FavoriteEntity = FavoriteEntity;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UserEntity', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FavoriteEntity.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DateEntity', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FavoriteEntity.prototype, "dateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], FavoriteEntity.prototype, "addedAt", void 0);
exports.FavoriteEntity = FavoriteEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'favorites', timestamps: true })
], FavoriteEntity);
exports.FavoriteSchema = mongoose_1.SchemaFactory.createForClass(FavoriteEntity);
// Compound index to prevent duplicates
exports.FavoriteSchema.index({ userId: 1, dateId: 1 }, { unique: true });
// Alias for consistency
exports.Favorite = FavoriteEntity;
//# sourceMappingURL=favorite.schema.js.map