import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewOrderSkeletonComponent } from "./preview-order-skeleton.component";

describe("SkeletonOrderComponent", () => {
	let component: PreviewOrderSkeletonComponent;
	let fixture: ComponentFixture<PreviewOrderSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewOrderSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewOrderSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
