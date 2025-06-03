import express from 'express';
import complaintsRoutes from './routes/complaints.routes';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api', complaintsRoutes);

export default app;
