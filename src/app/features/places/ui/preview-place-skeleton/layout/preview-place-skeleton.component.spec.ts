import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewPlaceSkeletonComponent } from "./preview-place-skeleton.component";

describe("PlacePreviewSkeletonComponent", () => {
	let component: PreviewPlaceSkeletonComponent;
	let fixture: ComponentFixture<PreviewPlaceSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewPlaceSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewPlaceSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
