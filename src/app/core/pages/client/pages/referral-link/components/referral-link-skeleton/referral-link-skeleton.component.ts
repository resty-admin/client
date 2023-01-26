import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-referral-link-skeleton",
	templateUrl: "./referral-link-skeleton.component.html",
	styleUrls: ["./referral-link-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferralLinkSkeletonComponent {}
