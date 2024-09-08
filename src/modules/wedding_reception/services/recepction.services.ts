import { PrismaClient } from "@prisma/client";
import { ReceptionType } from "../types/recepction.type";

export default class ReceptionService {
	private static prisma: PrismaClient = new PrismaClient();


	static async getAllReceptionService() { 
		const reception = await this.prisma.wedding_reception.findMany({
			select: {
				id: true,
				title_reception: true,
				name_man: true,
				title_man: true,
				parent_man: true,
				description_man: true,
				name_woman: true,
				title_woman: true,
				parent_woman: true,
				description_woman: true,
				start_date: true,
				end_date: true,
				location: true,
				address: true,
				user_id: true,
				theme_id: true,
			}
		})
		return reception
	}

	static async getOneRecpetionService(id: number) {
		try {	
			const receptionFound = await this.prisma.wedding_reception.findUnique({
				where: { id }
			})
			if (!receptionFound) {
				throw {
					message: "RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			return {
				status: 200,
				message: "Get one reception successfully",
				data: receptionFound
			}
		} catch (error) {
			return error
		}
	}

	static async createReceptionService(data: ReceptionType) {
		try {
			const reception = await this.prisma.wedding_reception.create({
				data: {
					title_reception: data.title_reception,
					name_man: data.name_man,
					title_man: data.title_man,
					parent_man: data.parent_man,
					description_man: data.description_man,
					name_woman: data.name_woman,
					title_woman: data.title_woman,
					parent_woman: data.parent_woman,
					description_woman: data.description_woman,
					start_date: new Date(data.start_date),
					end_date: new Date(data.end_date),
					location: data.location,
					address: data.address,
					user_id: data.user_id,
					theme_id: data.theme_id,
					wedding_status: "scheduled"
				},
				select: {
					id: true
				}
			})
			return  {
				status: 201,
				message: "Create reception successfully"
			}
		} catch (error) {
			throw {
				message: "ISE",
				status: 500
			}
		}
	}

	static async deleteOneReceptionService(id: number) {
		try {
			const recepctionFound = await this.prisma.wedding_reception.findUnique({
				where: { id }
			})
			if (!recepctionFound) {
				throw {
					message: "RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			await this.prisma.wedding_reception.delete({
				where: { id }
			})
			return {
				status: 200,
				message: "Delete reception successfully"
			}
		} catch (error) {
			return error
		}
	}

	static async updateOneReceptionService(id: number, data: ReceptionType) {
		try {
			const recepctionFound = await this.prisma.wedding_reception.findUnique({
				where: { id }
			})
			if (!recepctionFound) {
				throw {
					message: "RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			await this.prisma.wedding_reception.update({
				where: { id },
				data
			})
			return {
				status: 200,
				message: "Update reception successfully"
			}
		} catch (error) {
			return error
		}
	}
 }