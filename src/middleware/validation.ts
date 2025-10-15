import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: {
  body?: z.ZodSchema<any>;
  query?: z.ZodSchema<any>;
  params?: z.ZodSchema<any>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Dados de entrada inválidos',
        errors: error.errors,
      });
    }
  };
};
