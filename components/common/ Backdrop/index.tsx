interface BackdropProps {
  visible: boolean;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  const { visible } = props;

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 bg-black transition duration-300 ease-in-out
      ${
        visible
          ? "bg-opacity-30 pointer-events-auto"
          : "bg-opacity-0 pointer-events-none"
      }`}
    />
  );
};

export default Backdrop;
