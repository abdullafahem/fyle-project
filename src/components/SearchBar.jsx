import React from "react";

const SearchBar = (props) => {
  let timer = null;
  return (
    <div className='input-group w-25'>
      <input
        type='search'
        id='searchInput'
        className='form-control'
        placeholder='Search for a repository'
        aria-label='Search'
        aria-describedby='search-addon'
        onChange={(e) => {
          clearTimeout(timer);
          timer = setTimeout(() => props.setSearch(e.target.value), 500);
        }}
      />
    </div>
  );
};

export default SearchBar;
