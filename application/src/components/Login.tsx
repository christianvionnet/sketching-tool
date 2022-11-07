import Button from "./Button";
import SocialButton from "./SocialButton";

const Login = () => {
  return (
    <div className="login-container">
      <form className="form-container">
        <h3 className="form-title">Log in to continue</h3>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <span>
          <a href="">Forgot passoword?</a>
        </span>
        <Button label={"Log In"} type={"button"} />
        <div>
          <span>Don't have an account? </span>
          <span>
            <a href="">Sign up</a>
          </span>
        </div>
        <span>or</span>
        <SocialButton name={"Google"} />
      </form>
    </div>
  );
};

export default Login;
