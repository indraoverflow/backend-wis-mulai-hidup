import { Xendit, Balance as BalanceClient, PaymentMethod as PaymentMethodClient } from "xendit-node";
import { PaymentMethodParameters, PaymentMethod } from 'xendit-node/payment_method/models'

const xenditClient = new Xendit({
  secretKey: process.env.XENDIT_SECRET!,
});

export default xenditClient;

const { Balance } = xenditClient;

// const xenditBalanceClient = new BalanceClient({ secretKey: YOUR_SECRET_KEY });
const xenditPaymentMethodClient = new PaymentMethodClient({secretKey: process.env.XENDIT_SECRET!});

// const response: Balance = await xenditBalanceClient.getBalance({});

export async function xenditPayment(payload: any) {
  const data: PaymentMethodParameters = {
    mobileNumber: 628774494404,
    reusability: "MULTIPLE_USE",
    type: "DIRECT_DEBIT",
    directDebit: {
      channelProperties: {
        failureReturnUrl: "https://redirect.me/failure",
        successReturnUrl: "https://redirect.me/success",
      },
      channelCode: "BPI",
    },
    email: "testemail@email.com",
    customer: {
      type: "INDIVIDUAL",
      referenceId: "customer-123",
      individualDetail: {
        surname: "Doe",
        givenNames: "John",
      },
    },
  };
	const response: PaymentMethod = await xenditPaymentMethodClient.createPaymentMethod({
    data
	})
}
