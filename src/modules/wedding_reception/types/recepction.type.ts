import { wedding_status } from "@prisma/client"

export type ReceptionType = {
	title_reception: string
	name_man: string
	title_man: string
	parent_man: string
	description_man: string
	name_woman: string
	title_woman: string
	parent_woman: string
	description_woman: string
	start_date: string
	end_date: string
	location: string
	address: string
	user_id: number
	wedding_status: wedding_status | null
}