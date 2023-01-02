import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IAction {
	label: string;
	func: () => unknown;
}
@Injectable({ providedIn: "root" })
export class FooterService {
	actionSubject = new BehaviorSubject<IAction | undefined>(undefined);
	action$ = this.actionSubject.asObservable();

	setAction(action?: IAction) {
		this.actionSubject.next(action);
	}
}
