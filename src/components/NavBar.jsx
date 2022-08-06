import { useContext } from 'react'
import { useTodo }  from '../hooks/todo-hook'
import { ThemeContext } from '../App'

const NavBar = () => {
	const { sortedBy, sortBy } = useTodo();
	const { darkMode, toggleMode} = useContext(ThemeContext);

	return (
	      <nav className={darkMode ? "nav-bar dark ": "nav-bar"}>
	        <span className="app-name">To-Do App</span>
	        <div className="nav-items">
	            <label htmlFor="cars">Sort By</label>
	            <select id="cars" name="sortedBy" value={sortedBy} onChange={(event) => sortBy(event.target.value)}>
	              <option value="">-- Choose Sort --</option>
	              <option value="timeasc">Time Asc</option>
	              <option value="timedes">Time Des</option>
	              <option value="doneasc">Completed Asc</option>
	              <option value="donedes">Completed Des</option>
	              <option value="sizeasc">Length Asc</option>
	              <option value="sizedes">Length Des</option>
	            </select>
	        </div>
	        <div className="toggler">
				<p className="toggler-light">Light</p>
				<div className="toggler-slider" onClick={toggleMode}>
					<div className="toggler-slider-circle"></div>
				</div>
				<p className="toggler-dark">Dark</p>
			</div>
	      </nav>
	);
}

export default NavBar;