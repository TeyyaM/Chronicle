import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
// import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

// IMPORTANT! In progress. Not complete

const Login = () => {
  const { userRef } = useContext(UserContext);
  const user = userRef.current;
  // const history = useHistory();
  
  // if (!user) {
  //   history.push('/')
  // }

  const homeStyling = {
    backgroundColor: user ? user.background_hex : '#0b3c5d',
    color: user ? user.texte_hex : '#d9b310',   
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 250,
    borderColor: user ? user.secondary_hex : 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderRadius: 10,
    height: '300%',
  };


  return (
    <div style={homeStyling}>
      <LoginForm />
    </div>

  );
  
};

export default Login;
