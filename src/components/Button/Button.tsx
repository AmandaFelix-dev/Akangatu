import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
export function Button({ variant = 'primary', fullWidth = false, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'text';
    fullWidth?: boolean;
}) { return <button className={[styles[variant], fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')} {...props}/>; }
