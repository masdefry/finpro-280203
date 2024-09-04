import { UserPayload } from '../../controllers/auth.controller';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
