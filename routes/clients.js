import express from 'express';
import { createClient } from '../auth/clients.controller.js';

const router = express.Router();

router.post('/', createClient);

export default router;