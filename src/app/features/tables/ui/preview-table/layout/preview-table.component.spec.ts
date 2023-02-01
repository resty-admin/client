import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewTableComponent } from "./preview-table.component";

describe("TableComponent", () => {
	let component: PreviewTableComponent;
	let fixture: ComponentFixture<PreviewTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewTableComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
