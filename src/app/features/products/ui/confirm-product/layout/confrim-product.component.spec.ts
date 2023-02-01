import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ConfrimProductComponent } from "./confrim-product.component";

describe("ProductComponent", () => {
	let component: ConfrimProductComponent;
	let fixture: ComponentFixture<ConfrimProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ConfrimProductComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ConfrimProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
