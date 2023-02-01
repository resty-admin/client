import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProfileComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ProfileComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
