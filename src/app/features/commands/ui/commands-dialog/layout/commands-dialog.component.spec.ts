import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CommandsDialogComponent } from "./commands-dialog.component";

describe("CommandsDialogComponent", () => {
	let component: CommandsDialogComponent;
	let fixture: ComponentFixture<CommandsDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CommandsDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(CommandsDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
