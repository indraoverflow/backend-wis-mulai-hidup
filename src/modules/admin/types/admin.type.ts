import { gender } from "@prisma/client"

export type AdminType = {
    email: string
    password: string
    refresh_token?: string
    name?: string
    phone_number?: string
    gender: gender | null
}