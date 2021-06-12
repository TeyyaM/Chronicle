import { useContext, useEffect } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setUser(null)
    history.push('/')
    }, []);

  return (
    <div>
      </div>

  );
};

export default Logout;
