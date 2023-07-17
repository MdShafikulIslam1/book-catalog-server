import express from 'express';
import { BookRouter } from '../modules/books/book.routes';

const router = express.Router();
const modulesRoutes = [
  {
    path: '/books',
    route: BookRouter,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
export default router;
