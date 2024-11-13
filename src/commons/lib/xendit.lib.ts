import config from '../../config/config';
import axios from 'axios';
import { delayTime } from '../utils/delaytime';

export class XenditLib {
    private static token = Buffer.from(`${config.XENDIT_SECRET_KEY}:`, 'utf8').toString('base64');

    private static HttpApi = axios.create({
        baseURL: config.XENDIT_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.token}`
        }
    })
    private static async updateExpiredPayment(id: string) {
        const expired = new Date(new Date().getTime() + 30 * 60 * 1000);
        const response = await this.HttpApi.patch(`/v2/payment_methods/${id}`, {
            virtual_account: {
                channel_properties: {
                    expires_at: expired.toISOString()
                }
            },
        })
        
        return response.data;
    }
    static async getBalance() {
        const response = await this.HttpApi.get('/balance')
        return response.data;
    }

    static async createPayment(data: any) {
        
        const response = await this.HttpApi.post('/payment_requests', data)
        await delayTime(2000)
        if(response.status == 201){
            let expired = await this.updateExpiredPayment(response.data.payment_method.id);
            return {
                id: response.data.id,
                amount: response.data.amount,
                status: response.data.payment_method.status,
                payment_method_id: response.data.payment_method.id,
                created: response.data.created,
                info : expired.virtual_account
            };

        }else {
            throw new Error(response.data.message)
        }
    }
    static async GetPaymentInfoById(id: string) {
        const response = await this.HttpApi.get(`/payment_requests/${id}`)
        return response.data;
    };

}
