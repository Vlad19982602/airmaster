import express from 'express';
import { createProject } from '../auth/projects.controller.js';

const router = express.Router();

router.post('/', createProject);

export default router;