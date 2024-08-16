import cx from 'classnames';
import { RiLoader3Fill } from 'react-icons/ri';

type LoaderProps = {
  isFullHeight: boolean;
};

function Loader({ isFullHeight = false }: LoaderProps) {
  return (
    <div
      className={cx(
        'grid place-items-center',
        isFullHeight ? 'w-full h-screen' : 'w-full',
      )}
    >
      <div className="text-center">
        {/* {isFullHeight && <img src="/logo.png" className="max-h-20" alt="logo" /> } */}
        {isFullHeight && <h1 className="w-full text-3xl font-bold">FACEGOV</h1> }
        <p className="text-main flex items-center mt-4 justify-center">
          <RiLoader3Fill className="mr-1 text-primary animate-spin text-3xl" />
        </p>
      </div>
    </div>
  );
}

export default Loader;
