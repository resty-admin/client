import { AuthGuard } from "./auth/auth.guard";
import { JwtGuard } from "./jwt/jwt.guard";

export const AUTH_GUARDS = [AuthGuard, JwtGuard];

export * from "./auth/auth.guard";
export * from "./jwt/jwt.guard";
