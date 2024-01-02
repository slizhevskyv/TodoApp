import express from 'express';
import { validateSessionMiddleware } from '../middlewares';
import { TrackingController, UsersController, EngagementsController } from '../controllers';

const router = express.Router();

// MARK: Users
router.post('/users', UsersController.createUser);
router.get('/users', validateSessionMiddleware, UsersController.getUser);

// MARK: Engagements
router.get('/engagements', validateSessionMiddleware, EngagementsController.getEngagements);

// MARK: Tracking
router.post('/tracking/users', validateSessionMiddleware, TrackingController.trackUsers);
router.post('/tracking/engagements', validateSessionMiddleware, TrackingController.trackEngagements);
router.get('/tracking/report', validateSessionMiddleware, TrackingController.getReport);

export default router;
