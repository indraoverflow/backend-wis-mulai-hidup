import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    const subscription = await prisma.subscription.create({
        data: {
            user_id: 1,
            status_subscription: "on_process",
            expired_at: new Date(),
        }
    });
    await prisma.payment.create({
        data: {
            subscription_id: subscription.id,
            payment_amount: 10000,
            payment_method: "midtrans",
            payment_date: new Date(),
            status_payment: "pending",
        }
    });
    console.log("Media subscription completed");
}