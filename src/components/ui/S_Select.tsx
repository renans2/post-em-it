import type React from "react";

export default function S_Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="text-blue-700 cursor-pointer p-1 bg-white flex-1 text-center"
      style={{
        boxShadow: "6px 0px 7px -2px rgba(0,0,0,0.2)",
        background:
          "linear-gradient(to right, #E3E3E3, #E3E3E3 7%, #FDFDFD 15%, #FFFFFF)",
      }}
    >
      {children}
    </select>
  );
}
