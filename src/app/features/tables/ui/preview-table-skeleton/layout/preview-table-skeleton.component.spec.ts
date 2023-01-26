import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewTableSkeletonComponent } from "./preview-table-skeleton.component";

describe("SkeletonTableComponent", () => {
	let component: PreviewTableSkeletonComponent;
	let fixture: ComponentFixture<PreviewTableSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewTableSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewTableSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
