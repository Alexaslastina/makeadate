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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const favorite_schema_1 = require("./schemas/favorite.schema");
let FavoritesService = class FavoritesService {
    constructor(favoriteModel) {
        this.favoriteModel = favoriteModel;
    }
    async addToFavorites(userId, dateId) {
        // Check if already favorited
        const existing = await this.favoriteModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            dateId: new mongoose_2.Types.ObjectId(dateId),
        });
        if (existing) {
            throw new common_1.ConflictException('Date is already in favorites');
        }
        const favorite = await this.favoriteModel.create({
            userId: new mongoose_2.Types.ObjectId(userId),
            dateId: new mongoose_2.Types.ObjectId(dateId),
        });
        return favorite;
    }
    async removeFromFavorites(userId, dateId) {
        const result = await this.favoriteModel.findOneAndDelete({
            userId: new mongoose_2.Types.ObjectId(userId),
            dateId: new mongoose_2.Types.ObjectId(dateId),
        });
        if (!result) {
            throw new common_1.NotFoundException('Favorite not found');
        }
        return { message: 'Removed from favorites' };
    }
    async getUserFavorites(userId) {
        return this.favoriteModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .populate('dateId')
            .lean();
    }
    async isFavorite(userId, dateId) {
        const favorite = await this.favoriteModel.findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            dateId: new mongoose_2.Types.ObjectId(dateId),
        });
        return !!favorite;
    }
    async getUserFavoriteIds(userId) {
        const favorites = await this.favoriteModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .select('dateId')
            .lean();
        return favorites.map((f) => f.dateId.toString());
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.FavoriteEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map