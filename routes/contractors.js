import express from 'express';
import { createContractor, getContractors } from '../auth/contractors.controller.js';

const router = express.Router();

router.post('/', createContractor);
router.get('/', getContractors);

export default router;