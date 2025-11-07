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
exports.DateSchema = exports.DateEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
/**
 * אובייקט הדאטה של דייט
 */
let DateEntity = class DateEntity {
};
exports.DateEntity = DateEntity;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DateEntity.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], DateEntity.prototype, "shortDesc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'experience', index: true }),
    __metadata("design:type", String)
], DateEntity.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], DateEntity.prototype, "durationMin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], DateEntity.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], DateEntity.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], DateEntity.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DateEntity.prototype, "reviewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DateEntity.prototype, "avgRating", void 0);
exports.DateEntity = DateEntity = __decorate([
    (0, mongoose_1.Schema)({ collection: 'dates', timestamps: true })
], DateEntity);
/** הסכמה של Mongoose */
exports.DateSchema = mongoose_1.SchemaFactory.createForClass(DateEntity);
//# sourceMappingURL=date.schema.js.map