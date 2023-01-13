import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from "@angular/core";
import { BehaviorSubject, map, of, switchMap, take, tap } from "rxjs";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import type { ISimpleChanges } from "src/app/shared/interfaces";

import { DialogService } from "../../dialog";
import { ImageDialogComponent } from "../components/image-dialog/image-dialog.component";
import { IMAGE_CONFIG } from "../injection-tokens";
import { IImageConfig, IImageTheme } from "../interfaces";

@Component({
	selector: "app-image",
	templateUrl: "./image.component.html",
	styleUrls: ["./image.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnChanges {
	@Input() name? = "";
	@Input() theme: IImageTheme = "1";
	@Input() format: "png" | "svg" = "png";
	@Input() remote = false;
	@Input() placeholder = "";

	private _src = "";
	private _placeholder = "";

	private readonly remoteSubject = new BehaviorSubject(false);
	private readonly remote$ = this.remoteSubject.asObservable();

	readonly src$ = this.remote$.pipe(
		switchMap((remote) =>
			remote
				? of(`${this._imageConfig.remoteAssetsUrl}/${this.name}`)
				: this._imageConfig.theme$.pipe(
						map((theme) => `${this._imageConfig.localAssetsUrl}/${theme}/${this.name}.${this.format}`)
				  )
		),
		tap((src) => {
			this._src = src;
		})
	);

	readonly placeholderSrc$ = this._imageConfig.theme$.pipe(
		map((theme) => `${this._imageConfig.localAssetsUrl}/${theme}/${this.placeholder}.${this.format}`),
		tap((placeholder) => {
			this._placeholder = placeholder;
		})
	);

	constructor(
		@Optional() @Inject(IMAGE_CONFIG) private readonly _imageConfig: IImageConfig,
		private readonly _dialogService: DialogService
	) {}

	openImage() {
		this._dialogService
			.open(ImageDialogComponent, {
				data: {
					placeholder: this._placeholder,
					src: this._src,
					name: this.name
				}
			})
			.afterClosed$.pipe(take(1))
			.subscribe();
	}

	ngOnChanges(changes: ISimpleChanges<ImageComponent>) {
		if (!changes.remote) {
			return;
		}

		this.remoteSubject.next(changes.remote.currentValue);
	}

	get className() {
		return `app-image ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}
}
