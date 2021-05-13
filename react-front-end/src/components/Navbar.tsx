import { Link } from 'react-router-dom';
// import * as S from './styles';
const Navbar = () => {
  return (
    <nav>
    < img src="images/ChronicleLogo.png" alt="logo">
          </img>

      <Link to="/">Chronicle Your Day </Link>
      <Link to="/categories">Categories </Link>
      <Link to="/entries">Entries</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/graphs">Graphs</Link>
     
    </nav>
  )
}
export default Navbar;