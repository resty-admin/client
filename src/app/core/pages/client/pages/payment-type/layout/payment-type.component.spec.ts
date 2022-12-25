import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PaymentTypeComponent } from "./payment-type.component";

describe("PaymentTypeComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PaymentTypeComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PaymentTypeComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
