// const express = require('express');
import express from 'express'
import * as authCtrl from './auth.ctrl';
const Router = express.Router();

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;