import config from '../../config/config';
import axios from 'axios';

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
        const expired = new Date(new Date().getTime() + 10 * 60 * 1000);
        const response = await this.HttpApi.patch(`/v2/payment_methods/${id}`, {
            expires_at: expired
        })
        return response.data;
    }
    static async getBalance() {
        const response = await this.HttpApi.get('/balance')
        return response.data;
    }

    static async createPayment(data: any) {
        const response = await this.HttpApi.post('/payment_requests', data)
        const expired = await this.updateExpiredPayment(response.data.id);
        return {
            ...response.data,
            expires_at: expired
        };
    }
    static async GetPaymentById(id: string) {
        const response = await this.HttpApi.get(`/payment_requests/${id}`)
        return response.data;
    };

}
