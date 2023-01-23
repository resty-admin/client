import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonHallsSelectComponent } from "./skeleton-halls-select.component";

describe("SkeletonHallsSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonHallsSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonHallsSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
