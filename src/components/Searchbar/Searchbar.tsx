import { Search } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export function Searchbar() {
  const [, setLocation] = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchValue('');
    setLocation(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div className="h-10 flex-1 max-w-140 py-xs flex justify-stretch relative">
      <Search className="absolute top-3 left-4 text-neutral-content-strong" size={16} />
      <form
        className="w-full"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        role="search"
      >
        <input
          className="size-full text-center text-sm text-neutral-content-weak hover:bg-neutral-background-hover grow border border-orange-400 rounded-full focus:text-start focus:pl-12"
          name="q"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type="text"
          maxLength={128}
          placeholder="Find anything"
          required
        />
      </form>
    </div>
  );
}
