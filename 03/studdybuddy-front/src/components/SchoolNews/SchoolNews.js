import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Article,
	ArticleImage,
	Articles,
	Title,
	Wrapper,
} from 'components/SchoolNews/SchoolNews.styles';
import { useQuery, gql } from '@apollo/client';

const query = gql`
	{
		allArticles {
			title
			content
			image {
				url
				alt
			}
		}
	}
`;

const SchoolNews = () => {
	const [articles, setArticles] = useState([]);
	const { loading, error, data } = useQuery(query);

	return (
		<Wrapper>
			<Title>Gazetka szkolna</Title>
			<Articles>
				{loading && <h1>Loading...</h1>}
				{error && <h1>An error has been occurred.</h1>}
				{data &&
					data.allArticles.map((article) => (
						<Article key={article.title}>
							<ArticleImage>
								<img
									src={article.image.url}
									alt={article.image.alt}
								/>
							</ArticleImage>
							<div>
								<h3>{article.title}</h3>
								<p>{article.content}</p>
							</div>
						</Article>
					))}
			</Articles>
		</Wrapper>
	);
};

SchoolNews.propTypes = {};

export default SchoolNews;
