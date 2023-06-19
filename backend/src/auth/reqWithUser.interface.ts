import { Request } from 'express';
import { User } from 'src/entities';

interface ReqWithUser extends Request {
  user: User;
}

export default ReqWithUser;
