import fetch from 'node-fetch';
import { initialize } from 'passport';

export class PayAzaService {

    COLLECTION_API_KEY = "PZ78-PKLIVE-6200CEAB-FECF-4713-947A-3E6D02A28EC5";
    PAYOUT_API_KEY = "PZ78-PKLIVE-0E3EEBF6-B58B-4DD2-9C78-99D1E61945F8";
    TRANS_PIN = "1429";
    BASE64_API_KEY = Buffer.from(this.PAYOUT_API_KEY).toString('base64');
    BASE64_COLLECTION_API_KEY = Buffer.from(this.COLLECTION_API_KEY).toString('base64');

    BASE_URL = "https://router-live.78financials.com/api/request/secure/payloadhandler";
    CHARGE_BASE_URL = "https://cards-live.78financials.com/card_charge/";
    TRANSFER_URL = "https://api.payaza.africa/live/payout-receptor/payout";
    NAME_ENQUIRY_URL = "https://api.payaza.africa/live/payaza-account/api/v1/mainaccounts/merchant/provider/enquiry";
    TRANS_QUERY_URL = "https://api.payaza.africa/live/payaza-account/api/v1/mainaccounts/merchant/transaction/";

    public makeRequest = async (url: any, options: any, body=null) => {
        let k = await fetch(url, options);
        let response = await k.json();
        try {
            return { data: response, error: null }
        } catch(err) {
            return { data: null, error: err }
        }
    }

    public createDynamicAccount = async (parsedBody: any) => {
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
                  "virtual_account_provider": "Providus",
                  "payment_amount": 102,
                  "payment_reference": parsedBody.payment_reference,
                }
            });
            console.log("createDynamicAccounts RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("CreateDynamicAccount Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public getVirtualAccountDetails = async (account_number: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "GetAccountDetailsStaticAndDynamic",
                  "virtual_account_number": account_number
                }
              });
            
            console.log("getVirtualAccountDetails RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody     
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("getVirtualAccountDetails Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public createReservedAccount = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "CreateReservedAccountForCustomers",
                  "customer_first_name": parsedBody.customer_first_name,
                  "customer_last_name": parsedBody.customer_last_name,
                  "customer_email": parsedBody.customer_email,
                  "customer_phone": parsedBody.customer_phone,
                  "virtual_account_provider": "Providus"
                }
              });
            console.log("CreateReservedAccount RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("CreateReservedAccount Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public getTransactionHistoryStaticAccountRequest = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "GetTransactionHistoryStaticAccountRequest",
                  "static_account_number": parsedBody.static_account_number,
                  "start_date": parsedBody.start_date,
                  "end_date": parsedBody.end_date,
                  "order": parsedBody.order,
                  "page": 1
                }
            });
            console.log("GetTransactionHistoryStaticAccountRequest RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.BASE_URL, options);
            console.log("GetTransactionHistoryStaticAccountRequest Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public cardChargeRequest = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_type": "Account",
                "service_payload": {
                  "request_application": "Payaza",
                  "application_module": "USER_MODULE",
                  "application_version": "1.0.0",
                  "request_class": "UsdCardChargeRequest",
                  "first_name": parsedBody.first_name,
                  "last_name": parsedBody.last_name,
                  "email_address": parsedBody.email_address,
                  "phone_number": parsedBody.phone_number,
                  "amount": parsedBody.amount,
                  "transaction_reference": parsedBody.transaction_reference,
                  "currency": parsedBody.currency,
                  "description": parsedBody.description,
                  "card": {
                    "expiryMonth": parsedBody.card.expiryMonth,
                    "expiryYear": parsedBody.card.expiryYear,
                    "securityCode": parsedBody.card.securityCode,
                    "cardNumber": parsedBody.card.cardNumber
                  },
                  "callback_url": "www.payaza.com/charge-redirect"
                }
            });
            console.log("UsdCardChargeRequest RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.CHARGE_BASE_URL, options);
            console.log("UsdCardChargeRequest Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public refundCharge = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_payload": {
                  "transaction_reference": parsedBody.transaction_reference,
                  "refund_amount": parsedBody.refund_amount
                }
            });
            console.log("RefundCharge RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.CHARGE_BASE_URL+'/refund', options);
            console.log("RefundCharge Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public initializeTransfer = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "transaction_type": "nuban",
                "service_payload": {
                  "payout_amount": parsedBody.payout_amount,
                  "transaction_pin": parsedBody.transaction_pin, // this.TRANS_PIN
                  "account_reference": parsedBody.account_reference,
                  "currency": parsedBody.currency,
                  "payout_beneficiaries": [
                    {
                      "credit_amount": parsedBody.credit_amount,
                      "account_number": parsedBody.account_number,
                      "account_name": parsedBody.account_name,
                      "bank_code": parsedBody.bank_code,
                      "narration": parsedBody.narration,
                      "transaction_reference": parsedBody.transaction_reference,
                      "sender": {
                        "sender_name": parsedBody.sender_name,
                        "sender_id": parsedBody.sender_id,
                        "sender_phone_number": parsedBody.sender_phone_number,
                        "sender_address": parsedBody.sender_address
                      }
                    }
                  ]
                }
              });
            console.log("InitializeTransfer RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_COLLECTION_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.TRANSFER_URL, options);
            console.log("InitializeTransfer Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public getAccountNameEnquiry = async (parsedBody: any) => {
        try {
            let requestBody = JSON.stringify({
                "service_payload": {
                  "currency": parsedBody.currency,
                  "bank_code": parsedBody.bank_code,
                  "account_number": parsedBody.account_number
                }
              });
            console.log("GetAccountNameEnquiry RequestBody-->", requestBody)

            let options = {
                method: 'POST',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_COLLECTION_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: requestBody      
            }

            let response = await this.makeRequest(this.NAME_ENQUIRY_URL, options);
            console.log("GetAccountNameEnquiry Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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

    public getTransactionReference = async (transaction_reference: any) => {
        try {
            console.log("GetTransactionReference RequestBody-->", transaction_reference)

            let options = {
                method: 'GET',
                headers: {
                    'Authorization': 'Payaza '+this.BASE64_COLLECTION_API_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }     
            }

            let response = await this.makeRequest(this.TRANS_QUERY_URL+transaction_reference, options);
            console.log("GetTransactionReference Response---> ", response);
            if(response && response.data) {
                return { 
                    status: true,
                    message: "success",
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
