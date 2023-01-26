import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewProductSkeletonComponent } from "./preview-product-skeleton.component";

describe("ProductComponent", () => {
	let component: PreviewProductSkeletonComponent;
	let fixture: ComponentFixture<PreviewProductSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewProductSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewProductSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
