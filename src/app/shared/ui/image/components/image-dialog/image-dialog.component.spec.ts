import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ImageDialogComponent } from "./image-dialog.component";

describe("ConfirmationDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ImageDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ImageDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
