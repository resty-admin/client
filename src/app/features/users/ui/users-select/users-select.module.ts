import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { getI18nProvider } from "../../../../shared/i18n";
import { I18nModule } from "../../../../shared/modules/i18n";
import { UsersSelectComponent } from "./layout/users-select.component";

@NgModule({
	declarations: [UsersSelectComponent],
	imports: [CommonModule, ReactiveFormsModule, I18nModule],
	providers: [getI18nProvider("usersSelect", (lang) => import(`./i18n/${lang}.json`))],
	exports: [UsersSelectComponent]
})
export class UsersSelectModule {}
