import React from 'react';
import classNames from 'classnames';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  const handleOverlayClick = () => {
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface DialogSectionProps {
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogSectionProps> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const DialogHeader: React.FC<DialogSectionProps> = ({ children }) => (
  <div className="border-b pb-2 mb-4">{children}</div>
);

export const DialogTitle: React.FC<DialogSectionProps> = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const DialogDescription: React.FC<DialogSectionProps> = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

export const DialogFooter: React.FC<DialogSectionProps> = ({ children }) => (
  <div className="border-t pt-2 mt-4 flex justify-end space-x-2">{children}</div>
);
