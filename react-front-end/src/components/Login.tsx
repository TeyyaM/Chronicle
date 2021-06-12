import { useContext, useEffect } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { userRef, setUser } = useContext(UserContext);
  const user = userRef.current;
  const history = useHistory();
  
  
  console.log(user);
  useEffect(() => {
    axios.get('/api/users/1')
    .then((res) => {
      setUser(res.data[0]);
      history.push('/');
    })
    .catch(err => console.log('ERROR: ', err))
    }, []);

  return (
    <div>
      </div>

  );
};

export default Login;
