import { PrismaClient } from "@prisma/client";

export default class SubscriptionService {
	private static prisma: PrismaClient = new PrismaClient();

	static async createNewSubscriptionService(payload: any) {
		const { subscription, userId } = payload;
		const foundUser = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})
		if (!foundUser) throw {
			message: "USER_NOT_FOUND",
			status: 404
		}
		const foundSubscriptionType = await this.prisma.subscription_type.findUnique({
			where: {
				id: subscription.subscription_type_id
			}
		})

		if (!foundSubscriptionType) throw {
			message: "SUBSCRIPTION_TYPE_NOT_FOUND",
			status: 404
		}

		const subscriptionCreated = await this.prisma.subscription.create({
			data: {
				user_id: BigInt(userId),
				status_subscription: "on_process",
				expired_at: new Date(),
				subscription_type_id: subscription.subscription_type_id,
			}
		})
		await this.prisma.payment.create({
			data: {
				subscription_id: subscriptionCreated.id,
				payment_amount: foundSubscriptionType.price,
				payment_method: "midtrans",
				payment_date: new Date(),
				status_payment: "pending",
				midtrans_token: "token"
			}
		})
		return "Create subscription successfully"
	}
	
	static async deleteSubscriptionService(id: string) {
		await this.prisma.subscription.delete({
			where: {
				id: BigInt(id)
			}
		})
		return "Delete subscription successfully"
	}
}