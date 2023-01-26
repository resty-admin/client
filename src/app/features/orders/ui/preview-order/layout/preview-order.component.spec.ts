import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PreviewOrderComponent } from "./preview-order.component";

describe("OrderPreviewComponent", () => {
	let component: PreviewOrderComponent;
	let fixture: ComponentFixture<PreviewOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PreviewOrderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(PreviewOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
