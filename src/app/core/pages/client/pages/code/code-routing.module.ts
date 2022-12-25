import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { CodeComponent } from "./layout/code.component";

export const CODE_ROUTES: Route[] = [
	{
		path: "",
		component: CodeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(CODE_ROUTES)],
	exports: [RouterModule]
})
export class CodeRoutingModule {}
