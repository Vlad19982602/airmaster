import express from 'express'

import { registerUser, authUser, getProfile } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)
router.get('/profile').post(getProfile)

export default router