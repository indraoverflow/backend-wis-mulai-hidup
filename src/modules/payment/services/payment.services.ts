import { XenditLib } from "../../../commons/lib/xendit.lib";

export class PaymentService {
    static async getBalance() {
        try {
            const balance = await XenditLib.getBalance();
            return balance;
        } catch (error) {
            console.log(error);

            throw { message: "FAILED_GET_BALANCE", status: 400 };
        }
    }

}

