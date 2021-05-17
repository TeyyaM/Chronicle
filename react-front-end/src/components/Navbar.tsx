import { Link } from 'react-router-dom';
import TextButton from './TextButton';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

function Navbar() {
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  return (
    <div className="Navbar">

      <img src="images/ChronicleLogo.png" alt="logo" style={{height:'140%'}}>
      </img>
      <TextButton onClick={console.log('I was clicked')}
        text="hi"
        color="link" />
        {/* color={user ? user.background_hex : 'red'} /> */}

      <Link to="/"><button>Chronicle Your Day </button></Link>

      <Link to="/entries"><button>Entries</button></Link>
      <Link to="/settings"><button>Settings</button></Link>
      <Link to="/graphs"><button>Graphs</button></Link>
      <Link to="/categories"><button>Categories</button></Link>
      {!user ? 
      <><Link to="/login"><button>Login</button></Link>
      <Link to="/si-up"><button>Sign up</button></Link></>
      : <Link to="/logout"><button>Logout</button></Link>}
      
    </div>
  );
}

export default Navbar;