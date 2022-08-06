import { createContext, useState, useContext, useEffect } from 'react'
import {tasks as data} from '../data';

const TodoContext = createContext();

function TodoProvider({ children }){
	const [state, setState] = useState(getData());

	function getData(){
		return JSON.parse(localStorage.getItem('state')) || {
			tasks: data,
			sortBy: ''
		}
	}

	 useEffect(()=>{  
        localStorage.setItem('state', JSON.stringify(state));
    })

	const addTask = (text) =>  {
		console.log('addTask ', text)
		if (text.length){
			setState(prevTask => {
				return {
					...prevTask,
					tasks: [
						...prevTask.tasks, 
						{
				    		id: state.tasks.length + 1 || 1,
							task:text,
				    		isCompleted: false,
				    		timeStamp: new Date().getTime(),
						}
					]
				}
			})
		}
	}

	const removeTask = (id) =>  {
		console.log('removeTask ', id)
		setState(prev => ({...prev, tasks: prev.tasks.filter(task => task.id !== id)}))
	}

	const removeAllCompleted = () =>  {
		console.log('removeAllCompleted ')
		setState(prev => ({...prev, tasks: prev.tasks.filter(task => !task.isCompleted)}))
	}

	const toggleComplete = (id) => {
		console.log('toggleComplete ',id)
		setState(prev => {
			return {
				...prev,
				tasks: prev.tasks.map(task => {
					return task.id === id ? {...task, isCompleted:!task.isCompleted}: task
				})
			}
		})	
	}

	const updateTask = (id, text) => {
		console.log('updating ', id)
		console.log(text)
		setState(prev => {
			return {
				...prev,
				tasks: prev.tasks.map(tsk => {
					return tsk.id === id ? {...tsk, task:text, timeStamp: new Date().getTime()}: tsk
				})
			}
		})	
	}

	const sortBy = (criteria) => {
	  	if (criteria === state.sortBy){
	  		console.log('apa')
	  		return	
	  	} 

	  	let sortTasks = state.tasks;
	  	switch (criteria) {
		    case 'timeasc':
		    	sortTasks = sortTasks.sort((a, b) => a.timeStamp - b.timeStamp).reverse();
		      	break;
		    case 'timedes':
		      	sortTasks = sortTasks.sort((a, b) => a.timeStamp - b.timeStamp);
		      	break;
		    case 'doneasc':
		      	sortTasks = sortTasks.sort((a, b) => a.isCompleted - b.isCompleted).reverse();
		      	break;
		    case 'donedes':
		      	sortTasks = sortTasks.sort((a, b) => a.isCompleted - b.isCompleted);
		      	break;
		    case 'sizeasc':
		      	sortTasks = sortTasks
		        	.sort((a, b) => a.task.length - b.task.length)
		        	.reverse();
		      	break;
		    case 'sizedes':
		      	sortTasks = sortTasks.sort((a, b) => a.task.length - b.task.length);
		      	break;
		    default:
		      sortTasks = sortTasks.sort();
	 	}
	 	// console.log('sorting by ', criteria)
	 	// console.log(sortTasks)
	 	setState(prev => ({tasks:sortTasks, sortBy:criteria}))	
	}

	const tasks = state.tasks
	const sortedBy = state.sortBy
	return (
		<TodoContext.Provider 
			value={{ 
				tasks, 
				sortedBy, 
				addTask, 
				removeTask,
				toggleComplete, 
				removeAllCompleted,
				updateTask, 
				sortBy
			}}>
			{children}
		</TodoContext.Provider>
	)
}

const useTodo = () => useContext(TodoContext);

export {TodoProvider, useTodo}