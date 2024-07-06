import express, {urlencoded, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { connect } from "mongoose";

import { json } from 'body-parser';
import path from 'path';

import cookieSession from "cookie-session";
import passport from "passport";


import { COOKIE_KEY } from './utils/secrets';

import paymentRoutes from './modules/Payments/route';

connect('mongodb://127.0.0.1:27017/payazadb');

const app = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true, }));

// setting up cookieSession
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/payments', paymentRoutes);

const buildPath = path.normalize(path.join(__dirname, '../client/build'));
app.use(express.static(buildPath));

app.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
  res.status(500).json({ success: false,  statusCode: 500, message: err.message, data: null });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Platform is running on Port ${port}`));
