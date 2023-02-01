import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { IosDatepickerDialogComponent } from "./ios-datepicker-dialog.component";

describe("IosDatepickerComponent", () => {
	let component: IosDatepickerDialogComponent;
	let fixture: ComponentFixture<IosDatepickerDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IosDatepickerDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(IosDatepickerDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
