import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";

import { BasketComponent } from "./layout/basket.component";

@NgModule({
	declarations: [BasketComponent],
	imports: [CommonModule, RouterModule, I18nModule],
	exports: [BasketComponent]
})
export class BasketModule {}
