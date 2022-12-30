import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CompaniesQueryVariables = Types.Exact<Record<string, never>>;

export interface CompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "CompanyEntity";
					name: string;
					id: string;
					status: Types.CompanyStatusEnum;
					employees?: { __typename?: "UserEntity"; id: string }[] | null;
					fondy?: { __typename?: "FondyEntity"; id: string } | null;
					logo?: { __typename?: "FileEntity"; id: string } | null;
					owner: { __typename?: "UserEntity"; id: string };
					places?: { __typename?: "PlaceEntity"; id: string }[] | null;
			  }[]
			| null;
	};
}

export const CompaniesDocument = gql`
	query Companies {
		companies {
			data {
				name
				employees {
					id
				}
				fondy {
					id
				}
				id
				logo {
					id
				}
				name
				owner {
					id
				}
				places {
					id
				}
				status
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CompaniesGQL extends Apollo.Query<CompaniesQuery, CompaniesQueryVariables> {
	override document = CompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
