import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ConfirmProductsComponent } from "./confirm-products.component";

describe("ProductsComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ConfirmProductsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ConfirmProductsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
