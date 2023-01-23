import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SkeletonPlaceComponent } from "./skeleton-place.component";

describe("PlaceComponent", () => {
	let component: SkeletonPlaceComponent;
	let fixture: ComponentFixture<SkeletonPlaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SkeletonPlaceComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonPlaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
