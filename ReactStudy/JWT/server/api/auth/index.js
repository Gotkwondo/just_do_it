import express from 'express'
import * as authCtrl from './auth.ctrl.js';
import jwtMiddlware from '../lib/jwtMiddleware.js'

const auth = express.Router();
auth.use(express.json());

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check',jwtMiddlware, authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;