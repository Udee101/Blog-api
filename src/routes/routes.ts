import * as express from "express"
import { AuthController } from "../controllers/api/v1/AuthController"
import { ValidationMiddleware } from "../middleware/ValidationMiddleware"


const router = express.Router()

router.post('/register', ValidationMiddleware.userRegistrationValidation, AuthController.register)
router.get('/login', AuthController.login)

export default router
