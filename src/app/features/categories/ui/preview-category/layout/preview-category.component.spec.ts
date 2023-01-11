import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewCategoryComponent } from "./preview-category.component";

describe("CategoryComponent", () => {
	let component: PreviewCategoryComponent;
	let fixture: ComponentFixture<PreviewCategoryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewCategoryComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewCategoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
