import React from 'react';
import classNames from 'classnames';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label {...props} className={classNames('block text-sm font-medium', className)}>
      {children}
    </label>
  );
};
