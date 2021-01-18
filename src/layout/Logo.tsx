import logo from 'src/assets/today.png';

type Props = {
  width: number;
  height: number;
};
const Logo: React.FC<Props> = ({ width, height }) => {
  return (
    <>
      <img src={logo} className="img_size" alt="Developer's Today" />
      <style scoped>
        {`
          .img_size {
            width: ${width}px;
            height: ${height}px;
          }
        `}
      </style>
    </>
  );
};

export default Logo;
