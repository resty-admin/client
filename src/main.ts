import "dayjs/locale/uk";

import { ApplicationRef, enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableElfProdMode } from "@ngneat/elf";
import { devTools } from "@ngneat/elf-devtools";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

dayjs.extend(utc);

dayjs().utcOffset(0);
dayjs.locale("uk"); // use locale globally
dayjs.extend(customParseFormat);

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
