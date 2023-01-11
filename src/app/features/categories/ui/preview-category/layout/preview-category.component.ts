import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-preview-category",
	templateUrl: "./preview-category.component.html",
	styleUrls: ["./preview-category.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCategoryComponent {
	@Input() category: any;
}
