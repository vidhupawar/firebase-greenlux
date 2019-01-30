import { AuthGuard } from "./auth-guard/auth.guard";

export { AuthGuard } from "./auth-guard/auth.guard";

export const APPLICATION_GUARD_PROVIDERS: Array<any> = [
    AuthGuard
]