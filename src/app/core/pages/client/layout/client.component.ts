import { ChangeDetectionStrategy, Component } from "@angular/core";
import { shareReplay } from "rxjs";

import { AuthService } from "../../../../features/auth/services";

@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
	isAsideOpen = false;

	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	constructor(private readonly _authService: AuthService) {}

	toggleAside() {
		this.isAsideOpen = !this.isAsideOpen;
	}
}
