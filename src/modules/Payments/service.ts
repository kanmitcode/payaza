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
        reqBody.rpayment_reference = GENERATE_REFERENCE();

        const getResult = await this._bankService.createDynamicAccounts(reqBody);

        return { 
            success: getResult.status, 
            statusCode: (getResult.status == true) ? 200 : 400, 
            message: (getResult.message != null) ? getResult.message : "Create Dynamic Accounts Response", 
            data: getResult.data.result 
        };
    }

    public getVirtualAccountDetails = async (reqBody: any) => {
        const getResult = await this._bankService.getVirtualAccountDetails(reqBody);
        return { 
            success: getResult.status, 
            statusCode: (getResult.status == true) ? 200 : 400, 
            message: (getResult.message != null) ? getResult.message : "Create Dynamic Accounts Response", 
            data: getResult.data.result 
        };
    }


}

