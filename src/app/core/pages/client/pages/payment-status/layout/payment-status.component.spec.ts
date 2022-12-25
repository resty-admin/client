import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PaymentStatusComponent } from "./payment-status.component";

describe("PaymentStatusComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PaymentStatusComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PaymentStatusComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
