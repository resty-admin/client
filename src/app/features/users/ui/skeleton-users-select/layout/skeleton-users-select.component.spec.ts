import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonUsersSelectComponent } from "./skeleton-users-select.component";

describe("SkeletonUsersSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonUsersSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonUsersSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
