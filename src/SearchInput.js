import React, { useState } from "react";
import "./App.css";

const SearchInput = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(inputValue);
  };

  return (
    <div className="SearchInput">
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
