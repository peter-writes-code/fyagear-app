interface ButtonProps {
  label: string;
  onClick?: () => {};
  visible: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { label, onClick, visible } = props;

  return (
    <button
      className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border
      border-gray-500 rounded-md shadow-md transition-all duration-200 ease-in-out
      transform hover:scale-110
      ${
        visible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-6 opacity-0 pointer-events-none"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
