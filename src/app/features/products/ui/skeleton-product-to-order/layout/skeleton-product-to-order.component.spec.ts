import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonProductToOrderComponent } from "./skeleton-product-to-order.component";

describe("ProductToOrderComponent", () => {
	let component: SkeletonProductToOrderComponent;
	let fixture: ComponentFixture<SkeletonProductToOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonProductToOrderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonProductToOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
