import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonCategoriesSelectComponent } from "./skeleton-categories-select.component";

describe("SkeletonCategoriesSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonCategoriesSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonCategoriesSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
