import { Link } from 'react-router-dom';
import React,  { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import axios from 'axios';


const Categories = () => {
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  console.log('from categories', user);
  const [categories, setCategories] = React.useState<any>([]);
  React.useEffect(() => {
    axios.get('/api/categories')
      .then((res) => {
        setCategories(res.data);
      })
  }, [])
  return (
    <div>
      <h2>Categories</h2>


      <div>
        <Link to="/category/:id"><ul>
          {categories.map(item=> (
            <li>{item.name}</li>
          ))}
            </ul>
            </Link>
      </div>
    </div>
  );
};

export default Categories;
