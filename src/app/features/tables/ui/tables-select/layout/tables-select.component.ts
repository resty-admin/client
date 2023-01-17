import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-tables-select",
	templateUrl: "./tables-select.component.html",
	styleUrls: ["./tables-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSelectComponent {
	@Output() tableClicked = new EventEmitter<any>();
	@Input() tables?: any[] | null;

	trackByFn(index: number) {
		return index;
	}

	emitTableClick(product: any) {
		this.tableClicked.emit(product);
	}
}
