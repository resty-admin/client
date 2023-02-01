import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ConnectToTableComponent } from "./connect-to-table.component";

describe("ConnectToTableComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ConnectToTableComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ConnectToTableComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
