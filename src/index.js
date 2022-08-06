import ReactDom from 'react-dom';
import { App } from "./App";
import './index.css';

import { TodoProvider } from './hooks/todo-hook'

ReactDom.render(
	<TodoProvider>
		<App/>
	</TodoProvider>,
	document.getElementById('root')
);