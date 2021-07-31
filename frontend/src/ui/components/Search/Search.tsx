import { Button } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React, { useState } from 'react';
import { FilterSection } from 'ui/components/Search/FilterSection/FilterSection';
import { useSearch } from 'ui/components/Search/hooks/useSearch';
import { Filters } from 'ui/types/Filters';

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(new Filters({}));

  const { handleSearch } = useSearch(searchTerm, selectedFilters);

  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => setSearchTerm(event.target.value);

  const handleFiltersChange = (updatedFilters: Filters) => setSelectedFilters({ ...updatedFilters });

  return (
    <div className="bg-danger p-3">
      <InputGroup
        onChange={handleChange}
        fill={true}
        large={true}
        round={true}
        onKeyDown={handleEnterKey}
        leftIcon="search"
        maxLength={55}
        rightElement={<Button text="Search" onClick={handleSearch} />}
      />

      <div className="mt-1">
        <FilterSection selectedFilters={selectedFilters} onChange={handleFiltersChange} onSubmit={handleSearch} />
      </div>
    </div>
  );
};
