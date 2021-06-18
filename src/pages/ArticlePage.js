import { useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { articles } from './articles';

export const ArticlePage = () => {
	const { name } = useParams();

	const matchingArticle = articles.find(
		article => article.name === name
	);

	return matchingArticle ? (
		<>
		<h1>{matchingArticle.title}</h1>
		{matchingArticle.content.map((paragraph, i) => (
			<p key={i}>{paragraph}</p>
		))}
		</>
	) : <NotFoundPage />;
}