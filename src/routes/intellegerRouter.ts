import express from 'express';
import * as intellegerController from '../controllers/intellegerController';

const router = express.Router();

// routes for '/'
router.get('/get', intellegerController.getDomain);
router.post('/post', intellegerController.postDomain);

export default router;