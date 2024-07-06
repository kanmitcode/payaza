import { Request, Response, NextFunction } from "express";
import { CryptoClass } from './index';

let ENCRYPT_REQUEST = process.env.ENCRYPT_REQUEST;
let ENCRYPT_BOTH_REQUEST_RESPONSE = process.env.ENCRYPT_BOTH_REQUEST_RESPONSE;

export const checkEncryptedRequest = () => {
    const CryptoObj = new CryptoClass();
    return async (req: Request, res: Response, next: NextFunction) => {
        if(req.method == 'POST' || req.method == 'PATCH' || req.method == 'DELETE') {
            if(ENCRYPT_REQUEST == 'true' || ENCRYPT_BOTH_REQUEST_RESPONSE == 'true') {
                const { parsedBody } = req.body;
                if(parsedBody) {
                    let decrypted = CryptoObj.decryptRequest(parsedBody);
                    let body = JSON.parse(decrypted);
                    req.body = body.parsedBody;
                    next();
                } else {
                    const message = { success: false, statusCode: 422,  message: "Invalid Request Body", data: null };  
                    return res.status(422).json(message);
                }
            } else {
                next();
            }
        } else {
            next();
        }
    };
}

