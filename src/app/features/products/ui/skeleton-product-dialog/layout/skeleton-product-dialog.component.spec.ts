import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SkeletonProductDialogComponent } from "./skeleton-product-dialog.component";

describe("ProductDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SkeletonProductDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(SkeletonProductDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
