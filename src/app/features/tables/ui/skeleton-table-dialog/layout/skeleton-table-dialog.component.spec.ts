import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonTableDialogComponent } from "./skeleton-table-dialog.component";

describe("TableDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonTableDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonTableDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
