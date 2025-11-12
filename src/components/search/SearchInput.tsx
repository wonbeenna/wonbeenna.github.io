import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      autoFocus
      type="text"
      placeholder="Search posts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-[8px] border border-gray400 px-3 py-1.5"
    />
  );
};

export default SearchInput;
