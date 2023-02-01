import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewHallSkeletonComponent } from "./preview-hall-skeleton.component";

describe("HallComponent", () => {
	let component: PreviewHallSkeletonComponent;
	let fixture: ComponentFixture<PreviewHallSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewHallSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewHallSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
