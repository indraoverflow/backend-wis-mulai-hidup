
export type paymentType = {
    subscribe_type_id:number,
    currency: "IDR",
    amount: number,
    payment_method: {
        type: "VIRTUAL_ACCOUNT",
        reusability: "ONE_TIME_USE",
        reference_id: string,
        virtual_account: {
            channel_code: string,
            channel_properties: {
                customer_name: string | ""
            },
            expires_at: string
        }
    },
    metadata: {
        sku: "PAYMENT_SUBSCRIBE"
    }
}