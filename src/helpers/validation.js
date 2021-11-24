// Validation
import Joi from '@hapi/joi';

// Register Validation
export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        role: Joi.required()
    });
    
    return schema.validate(data);
}

// Login Validation
export const loginValidation = (data) => {
    const schema = Joi.object({
        user: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    
    return schema.validate(data);
}