type Props = {
  name: String;
};

const SocialButton = ({ name }: Props) => {
  return (
    <button className="social-button">
      <img
        src="https://naya.studio/static/media/Logo_G.0e3cfcc744c444cb0b5f51ebccc31755.svg"
        alt="social-button"
      />
      <p>Log in with {name}</p>
    </button>
  );
};

export default SocialButton;
