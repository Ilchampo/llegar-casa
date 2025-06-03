import express from 'express';

import complaintsRoutes from './routes/complaints.routes';
import vehiclesRoutes from './routes/vehicles.routes';

import config from './config';

const app = express();

app.set('port', config.app.port);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/complaints', complaintsRoutes);
app.use('/api/vehicles', vehiclesRoutes);

app.get('/', (req, res) => {
	res.send('Llegar a Casa Backend - Running on port ' + app.get('port'));
});

export default app;
