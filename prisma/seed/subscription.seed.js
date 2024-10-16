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
        yield prisma.subscription_type.createMany({
            data: [{
                    name: "basic",
                    price: 150000
                }, {
                    name: "premium",
                    price: 200000
                }]
        });
        const subscription = yield prisma.subscription.create({
            data: {
                user_id: 1,
                status_subscription: "on_process",
                expired_at: new Date(),
                subscription_type_id: 2,
            }
        });
        yield prisma.payment.create({
            data: {
                subscription_id: subscription.id,
                payment_amount: 10000,
                payment_method: "midtrans",
                payment_date: new Date(),
                status_payment: "pending",
                midtrans_token: "example_token",
            }
        });
        console.log("Media subscription completed");
    });
}
