import { GoogleLoginButton } from 'react-social-login-buttons';

const GoogleButton = () => {
  const style = {
    border: 'none',
  };

  return (
    <GoogleLoginButton
      text='Sign in with Google'
      style={style}
      onClick={() => alert('Hello')}
    />
  );
};

export default GoogleButton;
