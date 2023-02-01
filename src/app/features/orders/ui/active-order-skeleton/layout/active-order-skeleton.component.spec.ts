import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ActiveOrderSkeletonComponent } from "./active-order-skeleton.component";

describe("SkeletonOrderComponent", () => {
	let component: ActiveOrderSkeletonComponent;
	let fixture: ComponentFixture<ActiveOrderSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ActiveOrderSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ActiveOrderSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
