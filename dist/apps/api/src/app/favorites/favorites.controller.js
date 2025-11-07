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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
// Simple auth guard - in production, use proper JWT guard
let FavoritesController = class FavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async addToFavorites(dateId, req) {
        // TODO: Get userId from JWT token in production
        const userId = req.headers['x-user-id'] || req.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.favoritesService.addToFavorites(userId, dateId);
    }
    async removeFromFavorites(dateId, req) {
        const userId = req.headers['x-user-id'] || req.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.favoritesService.removeFromFavorites(userId, dateId);
    }
    async getUserFavorites(req) {
        const userId = req.headers['x-user-id'] || req.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.favoritesService.getUserFavorites(userId);
    }
    async checkFavorite(dateId, req) {
        const userId = req.headers['x-user-id'] || req.user?.id;
        if (!userId) {
            return { isFavorite: false };
        }
        const isFavorite = await this.favoritesService.isFavorite(userId, dateId);
        return { isFavorite };
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Post)(':dateId'),
    __param(0, (0, common_1.Param)('dateId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "addToFavorites", null);
__decorate([
    (0, common_1.Delete)(':dateId'),
    __param(0, (0, common_1.Param)('dateId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeFromFavorites", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getUserFavorites", null);
__decorate([
    (0, common_1.Get)('check/:dateId'),
    __param(0, (0, common_1.Param)('dateId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "checkFavorite", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map