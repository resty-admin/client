import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CategoriesSelectComponent } from "./categories-select.component";

describe("CategoriesSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CategoriesSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CategoriesSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
