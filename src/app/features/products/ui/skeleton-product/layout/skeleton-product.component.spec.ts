import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonProductComponent } from "./skeleton-product.component";

describe("ProductComponent", () => {
	let component: SkeletonProductComponent;
	let fixture: ComponentFixture<SkeletonProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonProductComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
