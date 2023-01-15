import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TableDialogComponent } from "./table-dialog.component";

describe("TableDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TableDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(TableDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
