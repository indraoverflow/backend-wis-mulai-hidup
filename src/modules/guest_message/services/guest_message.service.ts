import { Prisma, PrismaClient } from "@prisma/client";
import { GuestMessageType } from "../types/guest_message.type";

export default class GuestMessageService {
    private static prisma: PrismaClient = new PrismaClient();

    static async createMessageByGuestService(invitation_id: String, payload: GuestMessageType) {
        const guestInvitationFound = await this.prisma.invitation.findUnique({
            where: {id: +invitation_id}
        })
        const messages = await this.prisma.guest_message.create({
            data: {
                invitation_id,
                wedding_reception_id: guestInvitationFound?.wedding_reception_id,
                message: payload.message,
                name: payload.name
            }
        })
        return messages
    }

    static async getAllReceptionMessageService(reception_id: String) {
        const messages = await this.prisma.guest_message.findMany({
            where: {
                reception_id
            }
        })
        return messages
    }
}