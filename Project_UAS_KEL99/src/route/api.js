import express from "express";
import userController from "../controller/user-controller.js";
import bookController from "../controller/book-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Book API
userRouter.post('/api/books', bookController.create);
userRouter.get('/api/books/:booksId', bookController.get);
userRouter.put('/api/books/:booksId', bookController.update);
userRouter.delete('/api/books/:booksId', bookController.remove);
userRouter.get('/api/books', bookController.search);

export {
    userRouter
}