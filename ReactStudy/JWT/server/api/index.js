import express from 'express';
import auth from './auth';

const Router = express.Router();

const api = new Router();

api.use('/auth', auth.routes())

export default api;