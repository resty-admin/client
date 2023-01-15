import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CreateOrderComponent } from "./create-order.component";

describe("CreateOrderComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CreateOrderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CreateOrderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
