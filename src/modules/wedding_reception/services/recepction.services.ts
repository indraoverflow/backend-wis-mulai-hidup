import { PrismaClient  } from "@prisma/client";
import { ReceptionType } from "../types/recepction.type";
import { WeddingCeremonyType } from "../../wedding_ceremony/types/wedding_ceremony.types";
import { WeddingMediaType } from "../types/wedding_media.type";
import { BrideGroomMediaType } from "../types/bridge_groom_media.type";

export default class ReceptionService {
	private static prisma: PrismaClient = new PrismaClient();


	static async getAllReceptionService() { 
		const reception = await this.prisma.wedding_reception.findMany()
		return reception
	}

	static async getReceptionByUserService(id: number) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: id
				},
				include: {
					role: true
				}
			})
			if (!user) {
				throw {
					message: "USER_NOT_FOUND",
					status: 404
				}
			} else if (user.role?.role_name !== 'user') {
				throw {
					message: "USER_NOT_FOUND",
					status: 404
				}
			}
			const reception = await this.prisma.wedding_reception.findMany({
				where: {
					user_id: id
				},
				include: {
					theme: true
				}
			})

			return reception
		} catch (error) {
			return error
		}
	}

	static async getOneRecpetionService(id: number) {
		try {	
			const receptionFound = await this.prisma.wedding_reception.findUnique({
				where: { id },
				include: {
					wedding_media: true,
					bride_groom_media: true,
					wedding_ceremony: true,
					theme: true
				}
			})
			if (!receptionFound) {
				throw {
					message: "RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			const formattedReception = {
				...receptionFound,
				woman_media: receptionFound.bride_groom_media?.filter((item) => item.media_owner === 'woman' && item.type == 'personal'),
				man_media: receptionFound.bride_groom_media?.filter((item) => item.media_owner === 'man' && item.type == 'personal'),
				man_story: receptionFound.bride_groom_media?.filter((item) => item.media_owner === 'man' && item.type == 'story'),
				woman_story: receptionFound.bride_groom_media?.filter((item) => item.media_owner === 'woman' && item.type == 'story'),
			}
			return {
				status: 200,
				message: "Get one reception successfully",
				data: formattedReception
			}
		} catch (error) {
			return error
		}
	}
  
	static async createReceptionService(user_id: number, data: ReceptionType, theme_id: number, wedding_ceremony: WeddingCeremonyType, account_bank: any) {
		try {
			const receptionT = await this.prisma.$transaction(async (prisma) => {
				const reception = await prisma.wedding_reception.create({
					data: {
						title_reception: data.title_reception,
						name_man: data.name_man,
						nickname_man: data.nickname_man,
						prefix_man: data.prefix_man,
						title_man: data.title_man,
						father_man: data.father_man,
						mother_man: data.mother_man,
						description_man: data.description_man,
						birthdate_man: new Date(data.birthdate_man),
						name_woman: data.name_woman,
						nickname_woman: data.nickname_woman,
						prefix_woman: data.prefix_woman,
						title_woman: data.title_woman,
						father_woman: data.father_woman,
						mother_woman: data.mother_woman,
						description_woman: data.description_woman,
						birthdate_woman: new Date(data.birthdate_woman),
						start_date: new Date(data.start_date),
						end_date: new Date(data.end_date),
						start_time: data.start_time,
						end_time: data.end_time,
						time_zone: data.time_zone,
						location: data.location,
						address: data.address,
						video_url: data.video_url,
						user_id: user_id,
						theme_id: theme_id,
						wedding_status: "scheduled",
					},
					select: {
						id: true
					}
				});

				await prisma.wedding_ceremony.create({
					data: {
						title_ceremony: wedding_ceremony.title_ceremony,
						start_date: new Date(wedding_ceremony.start_date),
						end_date: new Date(wedding_ceremony.end_date),
						start_time: wedding_ceremony.start_time,
						end_time: wedding_ceremony.end_time,
						location: wedding_ceremony.location,
						address: wedding_ceremony.address,
						wedding_reception_id: reception.id
					}
				});

				await prisma.account_bank.createMany({
					data: account_bank.map((item: any) => ({
						name: item.name,
						number: item.number,
						bank: item.bank,
						wedding_reception_id: reception.id
					}))
				})

				return reception; // Return the reception object
			});

			return {
				status: 201,
				message: "Create invitation reception successfully",
				receptionId: receptionT.id
			};
		} catch (error) {
			console.log(error, '<<<<<')
			throw {
				message: "ISE",
				status: 500
			};
		}
	}

	static async updateReceptionMediaService(id: number, weddingMedia: WeddingMediaType[], manMedia: BrideGroomMediaType[], womanMedia: BrideGroomMediaType[], ourStoryMan: BrideGroomMediaType[], ourStoryWoman: BrideGroomMediaType[]) {
		const receptionT = await this.prisma.$transaction(async (prisma) => {
			const receptionFound = await prisma.wedding_reception.findUnique({
				where: { id }
			})
			if (!receptionFound) {
				throw {
					message: "RECEPTION_NOT_FOUND",
					status: 404
				}
			}
			await prisma.wedding_media.createMany({
				data: weddingMedia
			});
			manMedia= manMedia.map((item) => {
				return {
					...item,
					type: 'personal',
					media_owner: "man"
				}
			})
			womanMedia = womanMedia.map((item) => {
				return {
					...item,
					type: 'personal',
					media_owner: "woman"
				}
			})
			ourStoryMan = ourStoryMan.map((item) => {
				return {
					...item,
					type: 'story',
					media_owner: "man"
				}
			})
			ourStoryWoman = ourStoryWoman.map((item) => {
				return {
					...item,
					type: 'story',
					media_owner: "woman"
				}
			})
			await prisma.bride_groom_media.createMany({
				data: [...manMedia, ...womanMedia, ...ourStoryMan, ...ourStoryWoman]
			});
		})
		return {
			status: 200,
			message: "Upload wedding, man, and woman media successfully"
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

	static async updateOneReceptionService(id: number, data: ReceptionType ) {
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

	static async updateCancelReceptionService(id: number) {
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
				data: {
					wedding_status: 'cancelled'
				}
			})
			return {
				status: 200,
				message: "Cancel reception successfully"
			}
		} catch (error) {
			return error
		}
	}
	static async updateCompleteReceptionService(id: number) {
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
				data: {
					wedding_status: 'completed'
				}
			})
			return {
				status: 200,
				message: "Complete reception successfully"
			}
		} catch (error) {
			return error
		}
	}
	static async updateInProgressReceptionService(id: number) {
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
				data: {
					wedding_status: 'in_progress'
				}
			})
			return {
				status: 200,
				message: "Reception in progress"
			}
		} catch (error) {
			return error
		}
	}
 }