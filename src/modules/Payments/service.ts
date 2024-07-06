import { PayAzaService } from '../../integrations/banks/service';
import { GENERATE_REFERENCE, } from '../../utils/constants';
export class PaymentService {

    
    private _bankService = new PayAzaService();

    public createDynamicAccount = async (reqBody: any) => { 
        const {
            customer_first_name,
            customer_last_name,
            customer_email,
            customer_phone,
            payment_amount,
            payment_reference
        } = reqBody;

        reqBody.customer_first_name = "Kanmi";
        reqBody.payment_reference = GENERATE_REFERENCE();

        const getResult = await this._bankService.createDynamicAccount(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public getVirtualAccountDetails = async (reqBody: any) => {
        const { account_number } = reqBody;
        const getResult = await this._bankService.getVirtualAccountDetails(account_number);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public createReservedAccount = async (reqBody: any) => {
        const getResult = await this._bankService.createReservedAccount(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public getTransactionHistoryStaticAccountRequest = async (reqBody: any) => {
        const getResult = await this._bankService.getTransactionHistoryStaticAccountRequest(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }
    
    public cardChargeRequest = async (reqBody: any) => {
        const getResult = await this._bankService.cardChargeRequest(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public refundCharge = async (reqBody: any) => {
        const getResult = await this._bankService.refundCharge(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public initializeTransfer = async (reqBody: any) => {
        const getResult = await this._bankService.initializeTransfer(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public getAccountNameEnquiry = async (reqBody: any) => {
        const getResult = await this._bankService.getAccountNameEnquiry(reqBody);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

    public getTransactionReference = async (transaction_reference: any) => {
        const getResult = await this._bankService.getTransactionReference(transaction_reference);
        return { 
            success: getResult.status, 
            statusCode: getResult.data.response_code, 
            message: getResult.data.response_message,
            data: getResult.data
        };
    }

}

