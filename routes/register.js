import express from 'express';
import { registerUser } from '../auth/auth.controller.js';

const router = express.Router();

router.post('/', registerUser);

export default router;