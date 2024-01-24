import * as express from "express"
import { AuthController } from "../controllers/api/v1/AuthController"
import { ValidationMiddleware } from "../middleware/ValidationMiddleware"
import { PostController } from "../controllers/api/v1/PostController"
import { authenticateToken, generateAccessToken } from "../middleware/TokenAuthentication"


const router = express.Router()

router.post('/auth/register', ValidationMiddleware.userRegistrationValidation, AuthController.register)
router.post('/auth/login', ValidationMiddleware.userLoginValidation, AuthController.login)
router.get('/auth/refresh-token', generateAccessToken)

router.use('/posts',  authenticateToken)
router.post('/posts', ValidationMiddleware.postCreationValidation, PostController.create)
router.get('/posts', PostController.getAllPosts)

router.use('/posts/:id', authenticateToken)
router.get('/posts/:id', PostController.getSinglePost)
router.put('/posts/:id', PostController.update)
router.delete('/posts/:id', PostController.destroy)

export default router
