import { TestBed } from "@angular/core/testing";

import { AsideComponent } from "./aside.component";

describe("AsideComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AsideComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(AsideComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
