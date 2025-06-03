import { Router } from 'express';

import { ComplaintsController } from '../controllers/complaints.controller';

const router = Router();

const complaintsController = new ComplaintsController();

router.get('/', (req, res) => complaintsController.getComplaints(req, res));

export default router;
