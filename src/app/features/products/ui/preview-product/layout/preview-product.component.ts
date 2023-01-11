import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-preview-product",
	templateUrl: "./preview-product.component.html",
	styleUrls: ["./preview-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewProductComponent {
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
