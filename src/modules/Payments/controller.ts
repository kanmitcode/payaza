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

    public createReservedAccount = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.createReservedAccount(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getTransactionHistoryStaticAccountRequest = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.getTransactionHistoryStaticAccountRequest(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public cardChargeRequest = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.cardChargeRequest(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public refundCharge = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.refundCharge(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public initializeTransfer = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.initializeTransfer(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getAccountNameEnquiry = async (parsedRequest: any) => {
        try {
            const payment = await this._paymentService.getAccountNameEnquiry(parsedRequest);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }

    public getTransactionReference = async (transaction_reference: any) => {
        try {
            const payment = await this._paymentService.getTransactionReference(transaction_reference);
            return payment; 
        } catch (error) {
            return this.sendResponse(error);
        }
    }
}
