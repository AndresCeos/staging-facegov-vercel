'use client';

import cx from 'classnames';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' ;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};
function Button({
  type = 'button', children, onClick = () => {}, className = '', disabled = false,
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        'bg-gray-950 text-white font-normal py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:transition duration-500 ease-in',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
