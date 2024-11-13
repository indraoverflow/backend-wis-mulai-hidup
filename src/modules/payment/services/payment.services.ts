import { PrismaClient } from "@prisma/client";
import { XenditLib } from "../../../commons/lib/xendit.lib";
import { paymentType } from "../types/payment.type";

export class PaymentService {
    
    private static prisma: PrismaClient = new PrismaClient()

    static async getBalance() {
        try {
            const balance = await XenditLib.getBalance();
            return balance;
        } catch (error) {
            console.log(error);

            throw { message: "FAILED_GET_BALANCE", status: 400 };
        }
    }
    
    static async createPayment(data: paymentType,id:string) {
       
            const subscriptionType = await this.prisma.subscription_type.findFirst({
                where: {
                    id: data.subscribe_type_id
                }
            })
            if(!subscriptionType) throw {message:"SUBSCRIBE_TYPE_NOT_FOUND",status:404}
            let expired_date = new Date()
            expired_date.setDate(expired_date.getDate() + 30)
            const user = await this.prisma.user.findUnique({
                where: {
                    id: +id
                }
            });
            if(!user) throw {message:"USER_NOT_FOUND",status:404}
            // Find subscription
            const userSubscription = await this.prisma.subscription.findFirst({
                where: {
                    user_id: user.id
                }
            })
            if(userSubscription && userSubscription.status_subscription === "ACTIVE") throw { message:"USER_ALREADY_SUBSCRIBED",status:400}

            if(!userSubscription){
                // Create subscription to database
                const subscription = await this.prisma.subscription.create({
                    data : {
                        subscription_type_id: data.subscribe_type_id,
                        expired_at: expired_date,
                        status_subscription: "ON_PROCESS",
                        user_id: user.id
                    }
                })
                // Create payment to xendit
                let payload = {
                    ...data,
                    amount: subscriptionType.price,
                    payment_method: {
                        ...data.payment_method,
                        virtual_account: {
                            ...data.payment_method.virtual_account,
                            channel_properties: {
                                customer_name: user.name!
                            }
                        }
                    }
                }
                
                const paymentXendit = await XenditLib.createPayment(payload);

                await this.prisma.payment.create({
                    data : {
                        payment_bank: data.payment_method.virtual_account.channel_code,
                        payment_amount: subscriptionType.price,
                        payment_date: new Date(),
                        subscription_id: subscription.id,
                        status_payment: "PENDING",
                        payment_request_id: paymentXendit.id,
                        payment_method_id: paymentXendit.payment_method_id,
                        virtual_account: paymentXendit.info.channel_properties.virtual_account_number,
                        limit_payment_date : paymentXendit.info.channel_properties.expires_at
                    }
                })

                return paymentXendit
            } else {
                
                await this.prisma.subscription.update({
                    where: {
                        id: userSubscription.id
                    },
                    data: {
                        status_subscription: "ON_PROCESS"
                    }
                })
                let payload = {
                    ...data,
                    amount: subscriptionType.price,
                    payment_method: {
                        ...data.payment_method,
                        virtual_account: {
                            ...data.payment_method.virtual_account,
                            channel_properties: {
                                customer_name: user.name!
                            }
                        }
                    }
                }
                const paymentXendit = await XenditLib.createPayment(payload);
                await this.prisma.payment.create({
                    data : {
                        payment_bank: data.payment_method.virtual_account.channel_code,
                        payment_amount: subscriptionType.price,
                        payment_date: new Date(),
                        subscription_id: userSubscription.id,
                        status_payment: "PENDING",
                        payment_request_id: paymentXendit.id,
                        payment_method_id: paymentXendit.payment_method_id,
                        virtual_account: paymentXendit.info.channel_properties.virtual_account_number,
                        limit_payment_date : paymentXendit.info.channel_properties.expires_at
                    }
                })
                return paymentXendit
            }
       
    }

    static async CheckPaymentStatus(id: string) {
        try {
            if(!id) throw {message:"PAYMENT_ID_NOT_FOUND",status:400}

            const payment = await XenditLib.GetPaymentInfoById(id);
            if(!payment) throw {message:"PAYMENT_NOT_FOUND",status:404}
            
            const PaymentHistoryId = await this.prisma.payment.findFirst({
                where: {
                    payment_request_id: id
                }
            })
            if(!PaymentHistoryId) throw {message:"PAYMENT_HISTORY_NOT_FOUND",status:404}
            if(payment.status === "PENDING") {
                return PaymentHistoryId
            }
            if(payment.status === "SUCCEEDED") {
                const paymentHistory = await this.prisma.payment.update({
                    where: {
                        id: PaymentHistoryId?.id
                    },
                    data: {
                        status_payment: "SUCCESS"
                    }
                })
                await this.prisma.subscription.update({
                    where: {
                        id: PaymentHistoryId?.subscription_id!
                    },
                    data: {
                        status_subscription: "ACTIVE"
                    }
                })
                return paymentHistory
            }
        } catch (error) {
            console.log(error);
            throw { message: "FAILED_GET_PAYMENT_INFO", status: 400 };
        }
    }

    static async getPaymentInfoById(id: string) {
        if(!id) throw {message:"PAYMENT_ID_NOT_FOUND",status:400}
        const PaymentHistoryId = await this.prisma.payment.findFirst({
            where: {
                payment_request_id: id,
            },
            include:{
                subscription: true
            }
        })
        if(!PaymentHistoryId) throw {message:"PAYMENT_HISTORY_NOT_FOUND",status:404}
        return PaymentHistoryId
    }

    static async GetAllPaymentHistory(id: string) {
        const paymentHistory = await this.prisma.subscription.findMany({
            where:{
                user_id: +id
            },
            include:{
                payment: true
            }
        });
        return paymentHistory.map((item) => item.payment).flat()
    }


}

