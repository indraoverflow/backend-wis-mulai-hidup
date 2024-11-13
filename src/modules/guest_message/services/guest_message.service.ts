import { Prisma, PrismaClient } from "@prisma/client";
import { GuestMessageType } from "../types/guest_message.type";

export default class GuestMessageService {
    private static prisma: PrismaClient = new PrismaClient();

    static async createMessageByGuestService(guest_invitation_id: String, payload: GuestMessageType) {
        const guestInvitationFound = await this.prisma.guest_invitation.update({
            where: {id: +guest_invitation_id},
            data: {status: payload.status}
        })
        const messages = await this.prisma.guest_message.create({
            data: {
                guest_invitation_id: +guest_invitation_id,
                wedding_reception_id: guestInvitationFound?.wedding_reception_id,
                message: payload.message,
                name: payload.name
            }
        })
        return messages
    }

    static async getAllReceptionMessageService(reception_id: String) {
        console.log(reception_id, '<<<< reception')
        const messages = await this.prisma.guest_message.findMany({
            where: {
                wedding_reception_id: reception_id
            }
        })
        return messages
    }
}