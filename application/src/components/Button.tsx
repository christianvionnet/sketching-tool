type Props = {
  label: string;
  type: "submit" | "reset" | "button";
};
const Button = ({ label, type }: Props) => {
  return (
    <button className="primary-button" type={type}>
      {label}
    </button>
  );
};

export default Button;
