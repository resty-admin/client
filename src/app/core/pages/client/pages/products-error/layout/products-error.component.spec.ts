import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ProductsErrorComponent } from "./products-error.component";

describe("ProductsErrorComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProductsErrorComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ProductsErrorComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
