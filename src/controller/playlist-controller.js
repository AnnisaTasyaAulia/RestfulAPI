import playlistService from "../service/playlist-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await playlistService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const playlistId = req.params.playlistId;
        const result = await playlistService.get(user, playlistId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const playlistId = req.params.playlistId;
        const request = req.body;
        request.id = playlistId;

        const result = await playlistService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}


const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const playlistId = req.params.playlistId;

        await playlistService.remove(user, playlistId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}


export default {
    create,
    get,
    update,
    remove,
}
