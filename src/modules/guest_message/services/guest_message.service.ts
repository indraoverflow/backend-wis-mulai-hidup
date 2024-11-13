import { Prisma, PrismaClient } from "@prisma/client";
import { GuestMessageType } from "../types/guest_message.type";

export default class GuestMessageService {
    private static prisma: PrismaClient = new PrismaClient();

    static async createMessageByGuestService(guest_unique_id: String, payload: GuestMessageType) {
        const guestInvitationFound = await this.prisma.guest_invitation.update({
            where: {unique_id: guest_unique_id},
            data: {status: payload.status}
        })
        const messages = await this.prisma.guest_message.create({
            data: {
                guest_unique_id: guest_unique_id,
                wedding_unique_id: guestInvitationFound?.wedding_unique_id,
                message: payload.message,
                name: payload.name
            }
        })
        return messages
    }

    static async getAllReceptionMessageService(wedding_unique_id: String) {
        const messages = await this.prisma.guest_message.findMany({
            where: {
                wedding_unique_id: wedding_unique_id
            }
        })
        return messages
    }

    static async deleteOneMessageService(id: number) {
        const message = await this.prisma.guest_message.delete({
            where: {id}
        })
        return message
    }
}