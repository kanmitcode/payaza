import { BaseController } from "../baseController";
import { PaymentService } from './service';

export class PaymentController extends BaseController {
    private _paymentService = new PaymentService();

    public createDynamicAccount = async (parsedBody: any) => {
        try {
            const payment = await this._paymentService.createDynamicAccount(parsedBody);
            return payment;
        } catch (error) {
            return this.sendResponse(error)
        }
    };

    public getVirtualAccountDetails = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.getVirtualAccountDetails(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

}
