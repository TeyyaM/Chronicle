import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className="Navbar">

      <img src="images/ChronicleLogo.png" alt="logo" style={{height:'140%'}}>
      </img>

      <Link to="/"><button>Chronicle Your Day </button></Link>

      <Link to="/entries"><button>Entries</button></Link>
      <Link to="/settings"><button>Settings</button></Link>
      <Link to="/graphs"><button>Graphs</button></Link>
      <Link to="/categories"><button>Categories</button></Link>
      
      <Link to="/login"><button>Login</button></Link>
      <Link to="/si-up"><button>Sign up</button></Link>
    </div>
  );
}

export default Navbar;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Navbar />, rootElement);