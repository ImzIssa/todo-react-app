import { FaArrowsAlt, FaCheck, FaTrashAlt} from 'react-icons/fa';
import styled, {css} from 'styled-components';
import { useTodo }  from '../hooks/todo-hook';

const StyledSpan = styled.span`
	margin: 1em 1em;
	font-size: 1.25em;
	content-editable: true;
	${props => props.isCompleted && css`
		text-decoration: line-through;
	  	color: #ccc;
	`}
`
const StyledFaTrashAlt = styled(FaTrashAlt)`
	&:hover{
		color: tomato;
	}
`


export default function TodoList ({reff, id, task, isCompleted}) {
	const {toggleComplete, removeTask, updateTask} = useTodo();
	const styles = { 
		cursor: 'pointer',
		margin: '0 0.25em',
		fontSize: '1.25em'
	}

	const handleUpdate = (event) => {
		event.preventDefault();
		if(event.key === "Enter"){
			const text = event.target.innerText  
			reff.current.focus()
			text !== task && updateTask(id, text)
		}
	}

	return (
		<div 
			className='to-do-row custom-row' 
			draggable 
			id={id} 
			onDrag={(event)=> event.preventDefault()}>
			<div className='two'>
				{
					isCompleted ? <FaCheck style={styles} onClick={()=> toggleComplete(id)}/> : 
					<input 
						className='checkbox' 
						type="checkbox"
						checked={isCompleted} 
						onChange={()=> toggleComplete(id)}
						style={styles}
					/>
				}
	 			<StyledSpan
	 				className="to-do" 
	 				isCompleted={isCompleted} 
	 				contentEditable={!isCompleted?true:false}
	 				onKeyUp={handleUpdate}	
	 			>{task}
	 			</StyledSpan>	
			</div>
			<StyledFaTrashAlt onClick={()=> removeTask(id)} style={styles}/>
		</div>
	); 
}
