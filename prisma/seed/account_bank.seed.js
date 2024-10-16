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
        const account_bank = yield prisma.account_bank.findMany();
        yield prisma.account_bank.createMany({
            data: [
                {
                    name: "Andi Lukito",
                    number: "123456789",
                    bank: "BCA",
                    wedding_reception_id: 1
                },
                {
                    name: "Anggi Kurnia",
                    number: "1112222",
                    bank: "BNI",
                    wedding_reception_id: 1
                }
            ]
        });
        console.log("Account bank seed completed");
    });
}
