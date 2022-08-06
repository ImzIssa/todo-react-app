import { useEffect, useRef, useContext} from 'react';
import { useTodo }  from '../hooks/todo-hook'
import TodoList from './TodoList';
import { ThemeContext } from '../App'

export default function Todo () {
	const {tasks, addTask, removeAllCompleted} = useTodo();
	const { darkMode } = useContext(ThemeContext);
	const textUrl = useRef();

	useEffect(()=>{
		textUrl.current.focus();
	}) 

	return (
		<div className={darkMode? "app dark": "app"}>
	        <div className="custom-row">
	          <h2 className="title">To-Do List</h2>
	        </div>
	        <div className="add custom-row">
	          <span 
	          	ref={textUrl} 
	          	contentEditable 
	          	className="input placeholder"
	          	onKeyPress={()=>textUrl.current.classList.remove('placeholder')}
	          	onBlur={() => textUrl.current.innerText.length <= 0 && textUrl.current.classList.add('placeholder')}
	          	>
	          	</span>
	          <i className="return" onClick={() => {addTask(textUrl.current.innerText); textUrl.current.innerText="";}}>+</i>
	        </div>
	        <div className="to-do-list">
	        	{ 
	        		tasks.length > 0 ? tasks.map((task, id) => <TodoList key={id} {...task} reff={textUrl}/>) :
	        		<div className="custom-row no-tasks">No Tasks</div>
	        	}
	        </div>
	        <div className="clear-all custom-row">
	          <span className="clear-text" onClick={removeAllCompleted}>Clear all completed</span>
	        </div>
      </div>
	);
}