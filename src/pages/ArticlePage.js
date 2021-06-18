import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { articles } from './articles';

// const response = await fetch('http://localhost:8080/api/articles/learn-react');
// const data = await response.json();

export const ArticlePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
	const { name } = useParams();

	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		const loadInfo = async () => {
			const response = await fetch(`/api/articles/${name}`);
			const data = await response.json();
			setArticleInfo(data);
			setIsLoading(false);
		}
		loadInfo();
	}, [name]);

	const matchingArticle = articles.find(
		article => article.name === name
	);

	const upvoteArticle = async () => {
		const response = await fetch(`/api/articles/${name}/upvotes`, {
			method: 'post',
		});	
		const data = await response.json();
		setArticleInfo(data);
	}

	const addComment = async () => {
		const response = await fetch(`/api/articles/${name}/comments`, {
			method: 'post',
			body: JSON.stringify({ author, text }),
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();
		setArticleInfo(data);
		setAuthor('');
		setText('');
	}

	return matchingArticle ? (
		<>
		<h1>{matchingArticle.title}</h1>
		{isLoading ? <p>Loading...</p> : (
			<div id="upvotes-section">
				<button onClick={() => upvoteArticle()}>Upvote</button>
				<p>This article has {articleInfo.upvotes} upvotes</p>
			</div>
		)}
		{matchingArticle.content.map((paragraph, i) => (
			<p key={i}>{paragraph}</p>
		))}
		<div id="add-comment-form">
			<h3>Add a Comment</h3>
			<label>
				Name:
				<input
					value={author}
					onChange={e => setAuthor(e.target.value)} />
			</label>
			<label>
				Comment:
				<textarea
					value={text}
					onChange={e => setText(e.target.value)}
					rows="4"
					cols="50" />
			</label>
			<button onClick={() => addComment()}>Add Comment</button>
		</div>
		<h3>Comments</h3>
		{articleInfo.comments.map(comment => (
			<div className="comment" key={comment.text}>
				<h4>{comment.author}</h4>
				<p>{comment.text}</p>
			</div>
		))}
		</>
	) : <NotFoundPage />;
}