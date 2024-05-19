import express from 'express'
import * as methods from './auth.controller.js'

const router = express.Router()

router.route('/login').post(methods.authUser)

export default router