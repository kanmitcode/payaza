import { Router, Request, Response,  NextFunction } from "express";

import { controllerHandler } from "../../shared/controllerHandler";
import { PaymentController } from './controller';

const router = Router();
const call = controllerHandler;
const Payment = new PaymentController();

router.post("/account/dynamic", call(Payment.createDynamicAccount, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/account/details/:account_number', call(Payment.getVirtualAccountDetails, (req: Request, res: Response, next: NextFunction) => [req.params]));
router.post('/account/reserved', call(Payment.createReservedAccount, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/transaction/history', call(Payment.getTransactionHistoryStaticAccountRequest, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/card/charge', call(Payment.cardChargeRequest, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/card/refund', call(Payment.refundCharge, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/transfer/initialize', call(Payment.initializeTransfer, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/account/enquiry', call(Payment.getAccountNameEnquiry, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.get('/transaction/status/:transaction_reference', call(Payment.getTransactionReference, (req: Request, res: Response, next: NextFunction) => [req.params.transaction_reference]));

export default router;