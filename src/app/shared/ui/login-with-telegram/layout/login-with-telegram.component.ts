import type { AfterViewInit, ElementRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { environment } from "@env/environment";

@Component({
	selector: "app-login-with-telegram",
	templateUrl: "./login-with-telegram.component.html",
	styleUrls: ["./login-with-telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginWithTelegramComponent implements AfterViewInit {
	@ViewChild("script", { static: true }) script: ElementRef | undefined;

	convertToScript() {
		// @ts-expect-error
		const element = this.script.nativeElement;
		const script = document.createElement("script");
		script.src = "https://telegram.org/js/telegram-widget.js?5";
		script.dataset["telegramLogin"] = environment.dev ? "dev_resty_client_bot" : "resty_client_bot";
		script.dataset["size"] = "large";
		// Callback function in global scope
		// Callback function in global scope
		script.dataset["onauth"] = "loginViaTelegram(user)";
		script.dataset["requestAccess"] = "write";
		element.parentElement.replaceChild(script, element);
	}

	ngAfterViewInit() {
		this.convertToScript();
	}
}
