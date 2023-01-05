import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ConnectToOrderComponent } from "./connect-to-order.component";

describe("ConnectToOrderComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ConnectToOrderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ConnectToOrderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
