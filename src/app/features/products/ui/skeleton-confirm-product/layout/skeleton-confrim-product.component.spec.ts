import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonConfrimProductComponent } from "./skeleton-confrim-product.component";

describe("SkeletonConfrimProductComponent", () => {
	let component: SkeletonConfrimProductComponent;
	let fixture: ComponentFixture<SkeletonConfrimProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonConfrimProductComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonConfrimProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
