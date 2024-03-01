import * as express from "express"
import { UserController } from "../controllers/api/v1/UserController"
import { AuthController } from "../controllers/api/v1/AuthController"
import { userRegistrationValidation, authenticateToken, userLoginValidation, listingCreationValidation } from "../middleware"
import { ListingController } from "../controllers/api/v1/ListingController"

const router = express.Router()

router.post('/register', userRegistrationValidation, AuthController.register)
router.post('/login', userLoginValidation, AuthController.login)

router.use('/users/:id', authenticateToken)
router.get('/users/:id', UserController.getUser)
router.put('/users/:id', UserController.update)
router.get('/users/:id/listings', ListingController.getUserListings)

router.get('/listings', ListingController.index)
router.post('/listings', authenticateToken, listingCreationValidation, ListingController.create)

router.use('/listings/:id', authenticateToken)
router.get('/listings/:id', ListingController.show)
router.put('/listings/:id', ListingController.update)
router.delete('/listings/:id', ListingController.destroy)

export default router
