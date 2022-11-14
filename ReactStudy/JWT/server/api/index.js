import express from 'express';
import auth from './auth/index.js';

const api = express.Router();

api.use('/auth', auth);

export default api;