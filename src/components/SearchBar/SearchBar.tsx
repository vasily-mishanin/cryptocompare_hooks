import classes from './SearchBar.module.scss';
import { useState } from 'react';
import { SearchBarProps } from './types';

export function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const enteredSearchValue = (event.target as HTMLInputElement).value;
    setValue(enteredSearchValue);
  };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      <input
        className={classes.input}
        type='text'
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <button className={classes.btn}> Search</button>
    </form>
  );
}
