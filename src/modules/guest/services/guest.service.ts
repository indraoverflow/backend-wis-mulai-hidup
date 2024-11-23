import { PrismaClient, attendance_status} from "@prisma/client";
import UniqID from "short-unique-id"
import { Request } from "express";
export default class GuestInvitation {
    private static prisma: PrismaClient = new PrismaClient();

    static async CreateGuestInvitation(data:any){
        const unid = new UniqID({length:10})
        const newGuestInvitation = await this.prisma.guest_invitation.create({
            data:{
                unique_id : unid.rnd(),
                ...data
            }
        })
        return newGuestInvitation
    }

    static async GetAllGuestInvitations(id:string){
        const guestInvitations = await this.prisma.guest_invitation.findMany({
            where : {
                wedding_unique_id : id
            }
        })
        return guestInvitations
    }

    static async UpdateGuest(id:string,data:any){
        const guestInvitations = await this.prisma.guest_invitation.update({
            where:{
                unique_id : id
            },
            data : {
                name: data.name,
                phone_number: data.phone_number,
                // status: data.status,
                // wedding_unique_id: data.wedding_unique_id
            }
        })
        return guestInvitations
    }

    static async UpdateGuestStatus(id:string,status:attendance_status){
        const guestInvitations = await this.prisma.guest_invitation.update({
            where : {
                unique_id : id
            },
            data : {
                status : status 
            }
        })
        return guestInvitations
    }

    static async DeleteGuest(id:string){
        const GuestInvitations = await this.prisma.guest_invitation.delete({
            where:{
                unique_id: id
            }
        })
        return GuestInvitations
    }

    static async GetGuestWithWI(id:string){
        const Guest = await this.prisma.guest_invitation.findFirst({
            where:{
                unique_id : id
            },
            include:{
                wedding_reception : true
            }
        })
        return Guest
    }
}