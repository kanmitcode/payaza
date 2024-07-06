import { Router, Request, Response,  NextFunction } from "express";

import { controllerHandler } from "../../shared/controllerHandler";
import { PaymentController } from './controller';

const router = Router();
const call = controllerHandler;
const Payment = new PaymentController();

router.post("/dynamic-account", call(Payment.createDynamicAccount, (req: Request, res: Response, next: NextFunction) => [req.body]));
router.post('/virtual-account-details/:account_number', call(Payment.getVirtualAccountDetails, (req: Request, res: Response, next: NextFunction) => [req]));

export default router;