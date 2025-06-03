import { Router } from 'express';

import { VehicleController } from '../controllers/vehicles.controller';

const router = Router();

const vehicleController = new VehicleController();

router.get('/', (req, res) => vehicleController.getVehicle(req, res));

export default router;
