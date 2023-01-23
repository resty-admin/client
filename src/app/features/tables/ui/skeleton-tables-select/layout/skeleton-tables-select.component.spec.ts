import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonTablesSelectComponent } from "./skeleton-tables-select.component";

describe("CategoriesSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonTablesSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonTablesSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
