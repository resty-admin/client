import { TestBed } from "@angular/core/testing";

import { ClientComponent } from "./client.component";

describe("ClientComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ClientComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ClientComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
