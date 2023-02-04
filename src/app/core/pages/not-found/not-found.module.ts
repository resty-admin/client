import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";

import { NotFoundComponent } from "./layout/not-found.component";
import { NotFoundRoutingModule } from "./not-found-routing.module";

@NgModule({
	declarations: [NotFoundComponent],
	imports: [CommonModule, NotFoundRoutingModule, I18nModule],
	exports: [NotFoundComponent]
})
export class NotFoundModule {}
