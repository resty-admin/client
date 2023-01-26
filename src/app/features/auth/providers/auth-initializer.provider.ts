import { APP_INITIALIZER } from "@angular/core";
import { AuthRepository } from "@features/auth";
import { firstValueFrom } from "rxjs";

export const AUTH_INITIALIZER = {
	provide: APP_INITIALIZER,
	multi: true,
	useFactory: (authRepository: AuthRepository) => async () => firstValueFrom(authRepository.persist.initialized$),
	deps: [AuthRepository]
};
