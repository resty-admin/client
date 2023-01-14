import { Injectable } from "@angular/core";
import type { NavigationBehaviorOptions, NavigationExtras, UrlTree } from "@angular/router";
import { Router } from "@angular/router";
import { RouterRepository } from "@ngneat/elf-ng-router-store";
import type { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class RouterService {
	constructor(private readonly _routerRepository: RouterRepository, private readonly _router: Router) {}

	navigate(commands: any[], extras?: NavigationExtras) {
		return this._router.navigate(commands, extras);
	}

	navigateByUrl(url: UrlTree | string, extras?: NavigationBehaviorOptions) {
		return this._router.navigateByUrl(url, extras);
	}

	getParams(name?: string) {
		return this._routerRepository.getParams(name);
	}

	getQueryParams<T = any>(name?: string) {
		return this._routerRepository.getQueryParams<T>(name);
	}

	selectParams<T extends string>(names: string[]): Observable<T[]>;
	selectParams<T extends string>(names: string): Observable<T>;
	selectParams<T extends Record<string, string>>(): Observable<T>;
	selectParams(names?: string[] | string) {
		return this._routerRepository.selectParams(names as any);
	}

	selectFragment(): Observable<string> {
		return this._routerRepository.selectFragment();
	}

	selectQueryParams<T extends string>(names: string[]): Observable<T[]>;
	selectQueryParams<T extends string>(names: string): Observable<T>;
	selectQueryParams<T extends Record<string, string>>(): Observable<T>;
	selectQueryParams(names?: string[] | string) {
		return this._routerRepository.selectQueryParams(names as any);
	}
}
