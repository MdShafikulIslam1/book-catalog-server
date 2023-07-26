import express from 'express';
import { BookRouter } from '../modules/books/book.routes';
import { UserRouter } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
export default router;
