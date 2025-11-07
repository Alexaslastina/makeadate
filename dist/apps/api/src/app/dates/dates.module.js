"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dates_controller_1 = require("./dates.controller");
const dates_service_1 = require("./dates.service");
const date_schema_1 = require("./schemas/date.schema");
const reviews_module_1 = require("../reviews/reviews.module");
let DatesModule = class DatesModule {
};
exports.DatesModule = DatesModule;
exports.DatesModule = DatesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: date_schema_1.DateEntity.name, schema: date_schema_1.DateSchema }]),
            reviews_module_1.ReviewsModule, // לאפשר שימוש ב-ReviewsService
        ],
        controllers: [dates_controller_1.DatesController],
        providers: [dates_service_1.DatesService],
        exports: [dates_service_1.DatesService],
    })
], DatesModule);
//# sourceMappingURL=dates.module.js.map