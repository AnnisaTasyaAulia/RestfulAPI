// playlist-service.js
import { validate } from "../validation/validation.js";
import {
    createplaylistValidation,
    getplaylistValidation,
    updateplaylistValidation
} from "../validation/playlist-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
    const playlist = validate(createplaylistValidation, request);
    playlist.username = user.username;

    return prismaClient.playlist.create({
        data: playlist,
        select: {
            id: true,
            title: true,
            artist: true,
            composer: true,
            duration: true,
            category: true,
            listeners: true,
        }
    });
}

const get = async (user, playlistId) => {
    playlistId = validate(getplaylistValidation, playlistId);

    const playlist = await prismaClient.playlist.findFirst({
        where: {
            username: user.username,
            id: playlistId
        },
        select: {
            id: true,
            title: true,
            artist: true,
            composer: true,
            duration: true,
            category: true,
            listeners: true,
        }
    });

    if (!playlist) {
        throw new ResponseError(404, "playlist is not found");
    }

    return playlist;
}

const update = async (user, request) => {
    const playlist = validate(updateplaylistValidation, request);

    const totalplaylistInDatabase = await prismaClient.playlist.count({
        where: {
            username: user.username,
            id: playlist.id
        }
    });

    if (totalplaylistInDatabase !== 1) {
        throw new ResponseError(404, "playlist is not found");
    }

    return prismaClient.playlist.update({
        where: {
            id: playlist.id
        },
        data: {
            title: playlist.title,
            artist: playlist.artist,
            composer: playlist.composer,
            duration: playlist.duration,
            category: playlist.category,
            listeners: playlist.listeners,
        },
        select: {
            id: true,
            title: true,
            artist: true,
            composer: true,
            duration: true,
            category: true,
            listeners: true,
        }
    })
}

const remove = async (user, playlistId) => {
    playlistId = validate(getplaylistValidation, playlistId);

    const totalInDatabase = await prismaClient.playlist.count({
        where: {
            username: user.username,
            id: playlistId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "playlist is not found");
    }

    return prismaClient.playlist.delete({
        where: {
            id: playlistId
        }
    });
}

export default {
    create,
    get,
    update,
    remove
}
