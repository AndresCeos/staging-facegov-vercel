import cx from 'classnames';
import { RiLoader3Fill } from 'react-icons/ri';

export default function loading() {
  return (
    <main className="text-center">
      <div
        className={cx(
          'grid place-items-center',
          'w-full',
          'h-screen',
        )}
      >
        <div className="text-center">
          <h1 className="w-full text-3xl font-bold">FACESGOV</h1>
          <p className="text-main flex items-center mt-4 justify-center">
            <RiLoader3Fill className="mr-1 text-primary animate-spin text-3xl" />
          </p>
        </div>
      </div>
    </main>
  );
}
