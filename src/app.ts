import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
import globalErrorHandler from './app/middlewares/gobalErrorHandler';
const app = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', router);

app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'successfully working Express Backend setup Application',
  });
});

export default app;
