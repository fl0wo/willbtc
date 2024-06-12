import {AwsCreds} from "@/libs/drizzle/models/AwsCreds";

export type UserType = {
    id: string
    name: string
    email: string
    emailVerified: number
    image: string
    customerId: string
    priceId: string
    hasAccess: boolean
    credits: number
    aws: AwsCreds
}
