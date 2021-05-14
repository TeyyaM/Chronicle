import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';

// import Categories from './Categories';
// import ReactDOM from 'react-dom';
import { useEffect } from 'react';




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
  }, [searchTerm]);

  return (
    <div className="Navbar">

      <img src="images/ChronicleLogo.png" alt="logo">
      </img>

      <Link to="/">Chronicle Your Day </Link>
      <Link to="/categories">Categories </Link>
      <Link to="/entries">Entries</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/graphs">Graphs</Link>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Navbar />, rootElement);