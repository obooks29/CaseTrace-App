import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        "px-4 py-2 rounded-md text-sm font-medium shadow-sm " +
        (props.className ?? "")
      }
    >
      {children}
    </button>
  );
}
