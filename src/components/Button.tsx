import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'ghost';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  onClick,
  children,
  className
}) => {
  const baseClasses = 'rounded-xl px-5 py-3 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryPurple focus-visible:ring-offset-2 inline-block text-center';

  const variantClasses = {
    primary: 'bg-primaryPurple text-white hover:bg-darkPurple disabled:bg-gray-400 disabled:cursor-not-allowed',
    ghost: 'bg-white/80 text-primaryPurple border-2 border-primaryPurple hover:bg-lightPurpleBg disabled:opacity-50 disabled:cursor-not-allowed'
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    !disabled && 'hover:scale-105 active:scale-95',
    className
  );

  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;