import { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Footer () {
	const theme = useContext(ThemeContext)
	return (
		<footer className={theme.darkMode ? "footer dark ": "footer"}>
			<span className="footer-text">
				&copy; {new Date().getFullYear()} Imran, built with ReactJs 💕;
			</span>
		</footer>
	);
}