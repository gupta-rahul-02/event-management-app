import express from 'express';
const router = express.Router();
import {login, signup, forgotPassword,resetPassword} from '../controllers/userControllers.js'

router.route('/signup').post(signup);
router.route('/login').post(login)
router.route('/forgot').post(forgotPassword)
// router.route('/verify').post(verifyOtp)
router.route('/reset-password/:token').post(resetPassword)

router.route('')
export default router