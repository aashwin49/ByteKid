import React from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <h2 className="text-2xl font-bold text-teal-400 mb-4">{title}</h2>
  );
}
