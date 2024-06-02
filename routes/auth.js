import express from 'express';
import { authUser } from '../auth/auth.controller.js';

const router = express.Router();

router.post('/login', authUser);

export default router;