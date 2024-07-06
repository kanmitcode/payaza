import fetch from 'node-fetch';

export class PayAzaService {

    COLLECTION_API_KEY = "PZ78-PKLIVE-6200CEAB-FECF-4713-947A-3E6D02A28EC5";
    PAYOUT_API_KEY = "PZ78-PKLIVE-0E3EEBF6-B58B-4DD2-9C78-99D1E61945F8";
    PIN = "142";
    BASE64_API_KEY = Buffer.from(this.PAYOUT_API_KEY).toString('base64');

    BASE_URL = "https://router-live.78financials.com/api/request/secure/payloadhandler";

    GET_OPTIONS = {
        method: 'GET',
        headers: {
            'Authorization': 'Payaza '+this.BASE64_API_KEY, 
            'X-TenantID': 'live',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    POST_OPTIONS = {
        method: 'POST',
        headers: {
            'Authorization': 'Payaza '+this.BASE64_API_KEY,
            'X-TenantID': 'live',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    public makeRequest = async (url: any, options: any, body=null) => {
        let k = await fetch(url, options);
        let response = await k.json();
        try {
            return { data: response, error: null }
        } catch(err) {
            return { data: null, error: err }
        }
    }

    public createDynamicAccounts = async (parsedBody: any) => {
        try {
            console.log("BASE64_API_KEY--->",this.BASE64_API_KEY);

            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "MerchantCreateVirtualAccount",
                  "customer_first_name": parsedBody.customer_first_name,
                  "customer_last_name": parsedBody.customer_last_name,
                  "customer_email": parsedBody.customer_email,
                  "customer_phone": parsedBody.customer_phone,
                  "virtual_account_provider": "Premiumtrust",
                  "payment_amount": 102,
                  "payment_reference": parsedBody.payment_reference,
                }
            });

            console.log("createDynamicAccounts RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)      
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("Create Dynamic Account---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }


    public getVirtualAccountDetails = async (parsedBody: any) => {
        try {

            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "GetAccountDetailsStaticAndDynamic",
                  "virtual_account_number":  parsedBody.virtual_account_number
                }
              });

            let options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)      
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("Create Dynamic Account---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success.",
                    data: response.data
                };
            } else {
                return { 
                    status: false,
                    message: response.error,
                    data: null
                };
            }
        } catch (e) {
            return { 
                status: false,
                message: e,
                data: null
            };
        }
    }




}