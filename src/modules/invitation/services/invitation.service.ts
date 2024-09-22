import { PrismaClient } from "@prisma/client";
import { InvitationType } from "../types/invitation.type";
import { error } from "console";

export default class InvitationService {
	private static prisma: PrismaClient = new PrismaClient();

	static async createInvitationService(data: InvitationType) {
		const {wedding_reception_id} = data
		const wedding_reception = await this.prisma.wedding_reception.findUnique({
			where: {
				id: wedding_reception_id
			}
		})

		if (!wedding_reception) {
			throw {
				message: "WEDDING_RECEPTION_NOT_FOUND",
				status: 404
			}
		}
		const invitation = await this.prisma.invitation.create({
			data: data
		})
		return invitation
	}

	static async getAllReceptionInvitationService(wedding_reception_id: number) {
		try {
			console.log(wedding_reception_id, '<<< wedding_reception_id')
			const wedding_reception = await this.prisma.wedding_reception.findUnique({
				where: {
					id: wedding_reception_id
				}
			})

			if (!wedding_reception) {
				throw {
					message: "WEDDING_RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			console.log(wedding_reception_id, '<<< wedding_reception')
			const invitation = await this.prisma.invitation.findMany({
				where: {
					wedding_reception_id: wedding_reception_id
				},
				select: {
					name: true,
					phone_number: true
				}
			})
			console.log(invitation, '<<< invitation')
			return invitation
		} catch (error) {
			console.log(error, '<<< error')
			return error
		}
	}

	static async deleteInvitationService(id: number) {
		const invitationFound = await this.prisma.invitation.findUnique({
			where: {
				id
			}
		})
		if (!invitationFound) {
			throw {
				message: "INVITATION_NOT_FOUND",
				status: 404
			}
		}	
		await this.prisma.invitation.delete({
			where: {
				id: id
			}
		})
		return {
			status: 200,
			message: "Delete reception successfully",
			error: true
		}
		// try {
		// } catch (error) {
		// 	return error
		// }
	}
}