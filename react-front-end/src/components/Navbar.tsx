import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import styled from 'styled-components'

function Navbar() {
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
// 4em navbar 
  const Button = styled.button`
  background: ${ user ? user.background_hex : 'white' };
  color: ${ user ? user.secondary_hex : 'darkgrey' };
  border: none;
  text-decoration: none;
  height: 2em;
  box-shadow: 0px 0px 5px 5px #888888;
`;

  return (
    <div className="Navbar">

      <img src="images/ChronicleLogo.png" alt="logo" style={{height:'140%'}}>
      </img>

      <Link to="/"><Button>Chronicle Your Day </Button></Link>

      <Link to="/entries"><Button>Entries</Button></Link>
      <Link to="/settings"><Button>Settings</Button></Link>
      <Link to="/graphs"><Button>Graphs</Button></Link>
      <Link to="/categories"><Button>Categories</Button></Link>
      {!user ? 
      <><Link to="/login"><Button>Login</Button></Link>
      <Link to="/si-up"><Button>Sign up</Button></Link></>
      : <Link to="/logout"><Button>Logout</Button></Link>}
      
    </div>
  );
}

export default Navbar;