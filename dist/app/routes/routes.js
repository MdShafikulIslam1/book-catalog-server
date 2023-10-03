"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../modules/books/book.routes");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: '/books',
        route: book_routes_1.BookRouter,
    },
    {
        path: '/users',
        route: user_routes_1.UserRouter,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
