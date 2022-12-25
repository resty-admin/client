import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ReferralLinkComponent } from "./referral-link.component";

describe("ReferralLinkComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ReferralLinkComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ReferralLinkComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
