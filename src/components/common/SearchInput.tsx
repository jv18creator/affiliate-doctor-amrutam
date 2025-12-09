interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 bg-filled-field rounded-xl px-4 py-2 min-w-[240px]">
      <img src="/icons/search.svg" alt="" className="w-4.5 h-4.5" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="search"
        className="bg-transparent outline-none text-sm flex-1 placeholder:text-primary/50 font-medium"
      />
    </div>
  );
};

export default SearchInput;
