import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';

// import Categories from './Categories';
// import ReactDOM from 'react-dom';
import { useEffect } from 'react';
// import Category from './Category';



function Navbar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any>([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        // console.log(res.data)
        setSearchResults(res.data);
        setCategories(res.data);
      })
  }, [])
  useEffect(() => {
    const results = categories.filter(categories =>
      categories.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [categories, searchTerm]);

  return (
    <div className="Navbar">

      <img src="images/ChronicleLogo.png" alt="logo" style={{height:'140%'}}>
      </img>

      <Link to="/"><button>Chronicle Your Day </button></Link>

      <Link to="/entries"><button>Entries</button></Link>
      <Link to="/settings"><button>Settings</button></Link>
      <Link to="/graphs"><button>Graphs</button></Link>
      <Link to="/categories">
        <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content">
            <ul>
            <Link to={`/categories/${categories.id}`}>{categories.name}</Link><br/>
              {searchResults.map(item => (
               <li> {item.name}</li>
                ))}
            </ul>
          </div>
        </div></Link>
      <input
        type="text"
        placeholder="Search by Category"
        value={searchTerm}
        onChange={handleChange}
      />
      <Link to="/login"><button>Login</button></Link>
      <Link to="/sign-up"><button>Sign up</button></Link>
    </div>
  );
}

export default Navbar;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Navbar />, rootElement);