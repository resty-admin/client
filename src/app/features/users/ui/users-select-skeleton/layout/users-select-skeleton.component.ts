import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-skeleton-users-select",
	templateUrl: "./skeleton-users-select.component.html",
	styleUrls: ["./skeleton-users-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSelectSkeletonComponent {}
