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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./schemas/review.schema");
let ReviewsService = class ReviewsService {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    // ✅ החזרת כל הביקורות לדייט מסוים
    async findByDateId(dateId) {
        return this.reviewModel
            .find({ dateId: new mongoose_2.Types.ObjectId(dateId) })
            .lean()
            .exec();
    }
    // ✅ פונקציה לחישוב ממוצע ודירוגים (בשימוש ב־DatesService)
    async summaryForDate(dateId) {
        const stats = await this.reviewModel.aggregate([
            { $match: { dateId: new mongoose_2.Types.ObjectId(dateId) } },
            {
                $group: {
                    _id: null,
                    reviewsCount: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
        if (stats.length === 0) {
            return { reviewsCount: 0, avgRating: null };
        }
        const { reviewsCount, avgRating } = stats[0];
        return { reviewsCount, avgRating };
    }
    // ✅ יצירת ביקורת חדשה
    async create(dto) {
        const review = new this.reviewModel({
            dateId: new mongoose_2.Types.ObjectId(dto.dateId),
            userId: dto.userId ? new mongoose_2.Types.ObjectId(dto.userId) : undefined,
            rating: dto.rating,
            comment: dto.comment || '',
        });
        return review.save();
    }
    // ✅ רשימת ביקורות עם pagination
    async listByDate(dateId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const reviews = await this.reviewModel
            .find({ dateId: new mongoose_2.Types.ObjectId(dateId) })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        const total = await this.reviewModel
            .countDocuments({ dateId: new mongoose_2.Types.ObjectId(dateId) })
            .exec();
        return {
            data: reviews,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // ✅ סיכום דירוגים לדייט
    async getSummary(dateId) {
        return this.summaryForDate(dateId);
    }
    // ✅ מחיקת ביקורת
    async delete(reviewId) {
        const result = await this.reviewModel
            .findByIdAndDelete(reviewId)
            .exec();
        if (!result) {
            throw new Error('Review not found');
        }
        return { message: 'Review deleted successfully', deleted: result };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map