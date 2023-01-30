import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-referral-link-skeleton",
	templateUrl: "./referral-link-page-skeleton.component.html",
	styleUrls: ["./referral-link-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkPageSkeletonComponent {}
