import express from 'express';
import { BookRouter } from '../modules/books/book.routes';
import { UserRouter } from '../modules/user/user.routes';

const router = express.Router();
const modulesRoutes = [
  {
    path: '/books',
    route: BookRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
export default router;
