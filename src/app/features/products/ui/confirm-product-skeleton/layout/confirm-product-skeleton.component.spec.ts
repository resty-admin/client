import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ConfirmProductSkeletonComponent } from "./confirm-product-skeleton.component";

describe("SkeletonConfrimProductComponent", () => {
	let component: ConfirmProductSkeletonComponent;
	let fixture: ComponentFixture<ConfirmProductSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ConfirmProductSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmProductSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
