import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonOrderInfoComponent } from "./skeleton-order-info.component";

describe("OrderInfoComponent", () => {
	let component: SkeletonOrderInfoComponent;
	let fixture: ComponentFixture<SkeletonOrderInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonOrderInfoComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonOrderInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
