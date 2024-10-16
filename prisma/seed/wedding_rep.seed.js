"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const theme = yield prisma.theme.findFirst({
            where: {
                id: 1,
            }
        });
        yield prisma.wedding_reception.create({
            data: {
                title_reception: "sakura",
                start_date: new Date(),
                end_date: new Date(),
                start_time: "10:00",
                end_time: "11:00",
                time_zone: "WIB",
                location: "sakura",
                address: "sakura",
                description_man: "sakura",
                birthdate_man: new Date('1997-01-01'),
                birthdate_woman: new Date('2000-01-01'),
                description_woman: "sakura",
                prefix_man: "Mr.",
                name_man: "Andi Lukito",
                nickname_man: "Andi",
                title_man: "S.H.",
                father_man: "sakura",
                mother_man: "sakura",
                name_woman: "Anggi Kurnia",
                nickname_woman: "Anggi",
                prefix_woman: "Mrs",
                title_woman: "S.E.",
                father_woman: "sakura",
                mother_woman: "sakura",
                user_id: 1,
                theme_id: 1,
                wedding_status: "scheduled",
                video_url: "https://www.youtube.com"
            }
        });
        console.log("Wedding reception seed completed");
    });
}
