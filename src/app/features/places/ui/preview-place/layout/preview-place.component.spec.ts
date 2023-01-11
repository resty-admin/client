import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewPlaceComponent } from "./preview-place.component";

describe("PlaceComponent", () => {
	let component: PreviewPlaceComponent;
	let fixture: ComponentFixture<PreviewPlaceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewPlaceComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewPlaceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
