import { CryptoClass } from '../middleware';

let ENCRYPT_RESPONSE = process.env.ENCRYPT_RESPONSE;
let ENCRYPT_BOTH_REQUEST_RESPONSE = process.env.ENCRYPT_BOTH_REQUEST_RESPONSE;

/**
 * Handles controller execution and responds to user (API Express version).
 * @param promise Controller Promise. I.e. ControllerInstance().getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
// tslint:disable-next-line:ban-types
export const controllerHandler = (promise: Function, params:any) => {
    const CryptoObj = new CryptoClass();
    return async (req:any, res:any, next:any) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            console.log("Arguments passed to handler:", boundParams);  // Debugging line
            const result = await promise(...boundParams);
            const plainResponse = {
                success: result.success,
                statusCode: result.statusCode,
                data: result.data,
                message: result.message,
            }
            const encryptedResponse = CryptoObj.encryptRequest(JSON.stringify(plainResponse));
            const parsedResponse = {
                parsedResponse : encryptedResponse
            }
            
            let decryptt = CryptoObj.decryptRequest(encryptedResponse);
            // console.log("decryptt--->", decryptt);

            return res.status(result.statusCode).json(
                (ENCRYPT_RESPONSE == "true" || ENCRYPT_BOTH_REQUEST_RESPONSE == 'true') ? 
            parsedResponse : 
            plainResponse);
        } catch (error) {
            next(error);
        }
    };
};

