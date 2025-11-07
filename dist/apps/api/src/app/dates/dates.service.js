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
exports.DatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const date_schema_1 = require("./schemas/date.schema");
const reviews_service_1 = require("../reviews/reviews.service");
let DatesService = class DatesService {
    constructor(dateModel, reviewsService) {
        this.dateModel = dateModel;
        this.reviewsService = reviewsService;
    }
    // ✅ קבלת כל הדייטים (כולל ספירת ביקורות וממוצע)
    async findAll() {
        const dates = await this.dateModel.find().lean();
        // נשלב נתוני ביקורות לכל דייט
        const withStats = await Promise.all(dates.map(async (date) => {
            const { reviewsCount, avgRating } = await this.reviewsService.summaryForDate(date._id.toString());
            return { ...date, reviewsCount, avgRating };
        }));
        return withStats;
    }
    // ✅ קבלת דייט יחיד עם ביקורות וסטטיסטיקה
    async findOne(id) {
        const date = await this.dateModel
            .findById(new mongoose_2.Types.ObjectId(id))
            .lean()
            .exec();
        if (!date)
            return null;
        const { reviewsCount, avgRating } = await this.reviewsService.summaryForDate(id);
        return { ...date, reviewsCount, avgRating };
    }
    // ✅ הוספת דייט חדש
    async create(dto) {
        const created = new this.dateModel(dto);
        return created.save();
    }
    // ✅ עדכון דייט קיים
    async update(id, dto) {
        return this.dateModel
            .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), dto, { new: true })
            .exec();
    }
    // ✅ מחיקת דייט
    async delete(id) {
        await this.dateModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(id)).exec();
    }
    // ✅ Seed initial dates
    async seed() {
        const sample = [
            {
                title: 'Rooftop date',
                shortDesc: 'A Romantic Rooftop Date Idea for Two. Meeting and falling in love is such a thrilling, exciting time! When planning a date, you are going to want to make sure that it will impress the other person and be something that they will remember. One of the best ideas when it comes to heading out on a date is a rooftop. Not only are they fun, and give you a chance to chat, but they are also going to give you some pretty astounding views too.',
                category: 'outdoor',
                durationMin: 120,
                price: 200,
                tags: ['romantic', 'outdoor', 'rooftop'],
                isActive: true,
            },
            {
                title: 'Amusement park date',
                shortDesc: 'There is nothing like letting your inhibitions go and allowing yourself to act like a kid again. Even better if your date drops their defences and joins you! The more excited you are the better it will be. Experience the thrill of roller coasters, games, and fun activities together. Perfect for couples who want to have fun and create lasting memories.',
                category: 'outdoor',
                durationMin: 240,
                price: 150,
                tags: ['fun', 'outdoor', 'amusement'],
                isActive: true,
            },
            {
                title: 'Dance lesson date',
                shortDesc: 'Learn to dance together and connect on a whole new level. Dancing is a beautiful way to express yourself and create intimacy with your partner. Whether you prefer salsa, ballroom, or contemporary dance, this experience will bring you closer together while learning something new.',
                category: 'culture',
                durationMin: 90,
                price: 180,
                tags: ['dance', 'romantic', 'learning'],
                isActive: true,
            },
            {
                title: 'Picnic date',
                shortDesc: 'Enjoy a romantic picnic in a beautiful outdoor setting. Pack a basket with delicious food, find a scenic spot, and spend quality time together surrounded by nature. Whether in a park, by the beach, or in a garden, a picnic date is perfect for couples who enjoy simple, intimate moments and good conversation.',
                category: 'outdoor',
                durationMin: 120,
                price: 100,
                tags: ['romantic', 'outdoor', 'picnic'],
                isActive: true,
            },
            {
                title: 'Winery date',
                shortDesc: 'Explore the world of wine together at a local winery. Enjoy wine tastings, learn about different varietals, and discover your favorite flavors. This sophisticated date experience combines education, relaxation, and romance. Perfect for couples who appreciate fine wine and want to create a memorable, elegant experience.',
                category: 'food',
                durationMin: 180,
                price: 250,
                tags: ['romantic', 'wine', 'sophisticated'],
                isActive: true,
            },
            {
                title: 'Helicopter ride date',
                shortDesc: 'Soar above the clouds in a private helicopter ride. Experience breathtaking aerial views, see your city from a completely new perspective, and create an unforgettable romantic adventure. This luxury experience is perfect for special occasions and couples who want to celebrate their love in a truly spectacular way.',
                category: 'outdoor',
                durationMin: 60,
                price: 500,
                tags: ['luxury', 'adventure', 'romantic'],
                isActive: true,
            },
        ];
        await this.dateModel.deleteMany({});
        await this.dateModel.insertMany(sample);
        return { inserted: sample.length };
    }
};
exports.DatesService = DatesService;
exports.DatesService = DatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(date_schema_1.DateEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        reviews_service_1.ReviewsService])
], DatesService);
//# sourceMappingURL=dates.service.js.map