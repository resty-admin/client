import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonProductsToOrderSelectComponent } from "./skeleton-products-to-order-select.component";

describe("ProductsToOrderSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonProductsToOrderSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonProductsToOrderSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
