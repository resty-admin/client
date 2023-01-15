import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MenuComponent } from "./menu.component";

describe("CategoriesComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [MenuComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(MenuComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
