import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SchemaComponent } from "./schema.component";

describe("SchemaComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SchemaComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SchemaComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
