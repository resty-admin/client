import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewHallComponent } from "./preview-hall.component";

describe("HallComponent", () => {
	let component: PreviewHallComponent;
	let fixture: ComponentFixture<PreviewHallComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewHallComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewHallComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
