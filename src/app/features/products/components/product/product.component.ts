import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { skip } from "rxjs";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
	@Output() countChanged = new EventEmitter();
	@Input() product: any;

	readonly counterFormControl = new FormControl();

	ngOnInit() {
		this.counterFormControl.valueChanges.pipe(skip(1), untilDestroyed(this)).subscribe((count) => {
			this.countChanged.emit(count);
		});
	}
}
