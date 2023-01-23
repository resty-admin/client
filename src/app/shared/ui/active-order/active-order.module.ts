import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";

import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [CommonModule, RouterModule, I18nModule],
	exports: [ActiveOrderComponent]
})
export class ActiveOrderModule {}
