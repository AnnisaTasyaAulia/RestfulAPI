import express from "express";
import userController from "../controller/user-controller.js";
import playlistController from "../controller/playlist-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// playlist API
userRouter.post('/api/playlists', playlistController.create);
userRouter.get('/api/playlists/:playlistId', playlistController.get);
userRouter.put('/api/playlists/:playlistId', playlistController.update);
userRouter.delete('/api/playlists/:playlistId', playlistController.remove);

export {
    userRouter
}