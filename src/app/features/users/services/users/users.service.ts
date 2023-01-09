import { Injectable } from "@angular/core";
import { map, take, tap } from "rxjs";

import type { UpdateUserInput } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import { UpdateUserGQL, UsersGQL } from "../../graphql/users";

@Injectable({ providedIn: "root" })
export class UsersService {
	private readonly _usersQuery = this._usersGQL.watch({ skip: 0, take: 5 });

	readonly users$ = this._usersQuery.valueChanges.pipe(map((result) => result.data.users.data));

	constructor(
		private readonly _usersGQL: UsersGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _toastrService: ToastrService
	) {}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this._usersQuery.refetch();
			})
		);
	}
}
