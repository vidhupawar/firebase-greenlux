import { UserService } from './user-service/user.service';
import { AuthService } from './auth-service/auth.service';

export { UserService } from './user-service/user.service';
export { AuthService } from './auth-service/auth.service';

export const APPLICATION_AUTH_SERVICE_PROVIDERS: Array<any> = [
    UserService,
    AuthService,
]