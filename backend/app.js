import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import errorHandler from './middlewares/error.middleware.js';
import tourRoutes from './routes/tour.routes.js';
import quotationRoutes from './routes/quotation.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1', routes);
app.use(errorHandler);
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/quotations', quotationRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/users', userRoutes);

export default app;