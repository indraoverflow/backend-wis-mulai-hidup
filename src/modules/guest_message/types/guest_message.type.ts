import { attendance_status } from "@prisma/client"

export type GuestMessageType = {
    message: string,
    status: attendance_status,
    name: string
}