import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
	@Output() minusClicked = new EventEmitter();
	@Output() plusClicked = new EventEmitter();
	@Input() product: any;

	emitMinusClick() {
		this.minusClicked.emit();
	}

	emitPlusClick() {
		this.plusClicked.emit();
	}
}
