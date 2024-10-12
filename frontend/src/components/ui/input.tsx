import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        'px-3 py-2 border rounded focus:outline-none focus:ring',
        'border-gray-300',
        className
      )}
    />
  );
};
