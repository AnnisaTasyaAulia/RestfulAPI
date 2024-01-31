import Joi from "joi";

const createplaylistValidation = Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    composer: Joi.string().required(),
    duration: Joi.number().integer().required(),
    category: Joi.string().required().max(50),
    listeners: Joi.number().integer().required()
});

const getplaylistValidation = Joi.number().positive().required();

const updateplaylistValidation = Joi.object({
    id: Joi.number().positive().required(),
    title: Joi.string().required(),
    artist: Joi.string().required(),
    composer: Joi.string().required(),
    duration: Joi.number().integer().required(),
    category: Joi.string().required().max(50),
    listeners: Joi.number().integer().required()
});

export {
    createplaylistValidation,
    getplaylistValidation,
    updateplaylistValidation
};
