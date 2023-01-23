import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonActiveOrderComponent } from "./skeleton-active-order.component";

describe("SkeletonOrderComponent", () => {
	let component: SkeletonActiveOrderComponent;
	let fixture: ComponentFixture<SkeletonActiveOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonActiveOrderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonActiveOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
