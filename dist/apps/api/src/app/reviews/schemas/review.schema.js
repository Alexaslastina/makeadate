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
exports.Review = exports.ReviewSchema = exports.ReviewEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ReviewEntity = class ReviewEntity {
};
exports.ReviewEntity = ReviewEntity;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DateEntity', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ReviewEntity.prototype, "dateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UserEntity', required: false, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ReviewEntity.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1, max: 5 }),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, maxlength: 1000, default: '' }),
    __metadata("design:type", String)
], ReviewEntity.prototype, "comment", void 0);
exports.ReviewEntity = ReviewEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'reviews', timestamps: true })
], ReviewEntity);
exports.ReviewSchema = mongoose_1.SchemaFactory.createForClass(ReviewEntity);
// Alias for consistency
exports.Review = ReviewEntity;
//# sourceMappingURL=review.schema.js.map