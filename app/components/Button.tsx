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
  type = 'button', children, onClick, className, disabled,
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        'bg-gray-950 hover:bg-gray-700 text-white font-normal py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  className: '',
  disabled: false,
};

export default Button;
