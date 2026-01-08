'use client';
import React, { FC, useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: FC<AlertProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (!autoClose || !onClose) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [autoClose, onClose, duration]);

  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    error: <AlertCircle className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-start justify-between gap-3 animate-slide-up ${
        styles[type]
      }`}
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;