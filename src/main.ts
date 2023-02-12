import "dayjs/locale/uk";

import { ApplicationRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableElfProdMode } from "@ngneat/elf";
import { devTools } from "@ngneat/elf-devtools";
import dayjs from "dayjs";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

dayjs.locale("uk"); // use locale globally

if (environment.production) {
	enableProdMode();
	enableElfProdMode();
} else {
	// preventElfStateMutation();
}

function bootstrap() {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then((moduleReference) => {
			devTools({
				postTimelineUpdate: () => moduleReference.injector.get(ApplicationRef).tick()
			});
		})
		.catch((error) => console.error(error));
}

if (document.readyState === "complete") {
	bootstrap();
} else {
	document.addEventListener("DOMContentLoaded", bootstrap);
}
