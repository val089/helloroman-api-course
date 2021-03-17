import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const DATO_TOKEN = '6a8dcd4f6ad3d577034e7a33861f6c';

const httpLink = createHttpLink({
	uri: 'https://graphql.datocms.com/',
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${DATO_TOKEN}`,
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
