import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { UsersGQL } from "../../graphql/users";

@Injectable({ providedIn: "root" })
export class UsersService {
	readonly users$ = this._usersGQL.watch().valueChanges.pipe(map((result) => result.data.users.data));

	constructor(private readonly _usersGQL: UsersGQL) {}

	async refetch() {
		await this._usersGQL.watch().refetch();
	}
}
