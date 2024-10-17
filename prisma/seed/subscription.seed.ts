import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
    await prisma.subscription_type.createMany({
        data: [
        {
            name: "basic",
            price: 150000
        },
        {
            name: "premium",
            price: 200000
        }]
    })

    const subscription = await prisma.subscription.create({
        data: {
            user_id: 1,
            status_subscription: "on_process",
            expired_at: new Date(),
            subscription_type_id: 2,
        }
    });
    await prisma.payment.create({
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
}