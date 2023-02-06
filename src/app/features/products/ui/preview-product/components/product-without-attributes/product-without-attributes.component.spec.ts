import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ProductWithoutAttributesComponent } from "./product-without-attributes.component";

describe("ProductComponent", () => {
	let component: ProductWithoutAttributesComponent;
	let fixture: ComponentFixture<ProductWithoutAttributesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductWithoutAttributesComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductWithoutAttributesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
