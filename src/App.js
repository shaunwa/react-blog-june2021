import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ArticlesListPage } from './pages/ArticlesListPage';
import { ArticlePage } from './pages/ArticlePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<NavBar />
				<div id="page-body">
					<Switch>
						<Route path="/" exact> 
							<HomePage />
						</Route>
						<Route path="/about">
							<AboutPage />
						</Route>
						<Route path="/articles" exact>
							<ArticlesListPage />
						</Route>
						<Route path="/articles/:name">
							<ArticlePage />
						</Route>
						<Route>
							<NotFoundPage />
						</Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
