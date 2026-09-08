import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}

function Card({ children, title, footer, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-farm-100 bg-white shadow-sm ${className}`}
      {...rest}
    >
      {title && (
        <div className="border-b border-farm-100 px-4 py-3">
          <h3 className="font-display text-sm font-semibold text-farm-800">{title}</h3>
        </div>
      )}
      <div className="px-4 py-4">{children}</div>
      {footer && (
        <div className="rounded-b-2xl border-t border-farm-100 bg-farm-50 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;