import { PrismaClient} from "@prisma/client";

export default class GuestInvitation {
    private static prisma: PrismaClient = new PrismaClient();

    static async CreateGuestInvitation(data:any){
        const newGuestInvitation = await this.prisma.guest_invitation.create({
            data:data
        })
        return newGuestInvitation
    }

    static async GetAllGuestInvitations(id:number){
        const guestInvitations = await this.prisma.guest_invitation.findMany({
            where : {
                wedding_reception_id : id
            }
        })
        return guestInvitations
    }
}