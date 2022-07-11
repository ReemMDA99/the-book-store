import { gql } from "@apollo/client";

export const GET_ME_BASIC = gql`
	query me {
		me {
			_id
			username
			email
		}
	}
`;

export const GET_ME = gql`
	query me {
		me {
			_id
			username
			email
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;
