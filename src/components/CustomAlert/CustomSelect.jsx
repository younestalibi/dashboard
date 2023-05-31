import React, { useState } from 'react';

const CustomSelect = ({ categories, onChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="custom-select-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search category..."
        onChange={handleSearch}
      />
      <select
        className="form-select"
        name="category"
        onChange={onChange}
        size={5}
      >
        {filteredCategories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
