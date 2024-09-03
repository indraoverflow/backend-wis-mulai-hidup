import { Gender } from "@prisma/client"

export type AuthType = {
    email: string
    password: string
    refresh_token?: string
    name?: string
    phone_number?: string
    gender: Gender | null
}