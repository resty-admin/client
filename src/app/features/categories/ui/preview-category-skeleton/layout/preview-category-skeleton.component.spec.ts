import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewCategorySkeletonComponent } from "./preview-category-skeleton.component";

describe("CategoryComponent", () => {
	let component: PreviewCategorySkeletonComponent;
	let fixture: ComponentFixture<PreviewCategorySkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewCategorySkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewCategorySkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
