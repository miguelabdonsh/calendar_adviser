import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'default' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}) => {
  const classes = classNames(
    'px-4 py-2 rounded focus:outline-none focus:ring',
    {
      'bg-primary text-primary-foreground border border-transparent': variant === 'default',
      'bg-transparent text-primary border border-primary': variant === 'outline',
      'p-2': size === 'icon',
    },
    className
  );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
