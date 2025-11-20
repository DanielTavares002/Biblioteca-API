import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'biblioteca_secret_key';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    tipo: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token de autenticação não fornecido'
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = {
            id: decoded.id,
            email: decoded.email,
            tipo: decoded.tipo
        };
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Token inválido ou expirado'
        });
    }
};