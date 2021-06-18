import { Link } from 'react-router-dom';
import { articles } from './articles';

export const ArticlesListPage = () => {
	return (
		<>
		<h1>Articles</h1>
		{articles.map(article => (
			<Link to={`/articles/${article.name}`} key={article.name} className="article-list-item">
				<h3>{article.title}</h3>
				<p>{article.content[0].substring(0, 150)}...</p>
			</Link>
		))}
		</>
	);
}