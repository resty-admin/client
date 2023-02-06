import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ProductWithAttributesComponent } from "./product-with-attributes.component";

describe("ProductComponent", () => {
	let component: ProductWithAttributesComponent;
	let fixture: ComponentFixture<ProductWithAttributesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductWithAttributesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductWithAttributesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
