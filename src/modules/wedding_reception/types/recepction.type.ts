import { wedding_status, time_zone } from "@prisma/client"

export type ReceptionType = {
	title_reception: string
	name_man: string
	prefix_man: string
	title_man: string
	father_man: string
	mother_man: string
	description_man: string
	name_woman: string
	prefix_woman: string
	title_woman: string
	father_woman: string
	mother_woman: string
	description_woman: string
	start_date: string
	end_date: string
	time: string
	time_zone: time_zone
	location: string
	address: string
	theme_id: number
	wedding_status: wedding_status | null
}