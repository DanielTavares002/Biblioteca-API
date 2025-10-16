"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            if (schema.body) {
                req.body = schema.body.parse(req.body);
            }
            if (schema.query) {
                req.query = schema.query.parse(req.query);
            }
            if (schema.params) {
                req.params = schema.params.parse(req.params);
            }
            next();
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Dados de entrada inválidos',
                errors: error.errors,
            });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map