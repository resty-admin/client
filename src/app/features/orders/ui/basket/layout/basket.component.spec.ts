import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { BasketComponent } from "./basket.component";

describe("ActiveOrderComponent", () => {
	let component: BasketComponent;
	let fixture: ComponentFixture<BasketComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BasketComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(BasketComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
