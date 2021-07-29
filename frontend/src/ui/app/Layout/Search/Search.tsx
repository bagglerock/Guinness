import { Button } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import { stringify } from 'query-string';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Filters } from 'ui/app/Layout/Search/Filters/Filters';
import { FiltersModel } from 'ui/app/Layout/Search/Filters/FiltersModel';

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(new FiltersModel({}));
  const history = useHistory();

  const handleSearch = async () => {
    if (searchTerm === '') {
      return;
    }

    const searchParams = {
      query: searchTerm,
      pageNumber: 1,
    };

    history.push(`/search?${stringify(searchParams)}`);
  };

  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSearchTerm(event.target.value);
  };

  const handleFiltersChange = (updatedFilters: FiltersModel) => {
    setSelectedFilters({ ...updatedFilters });
  };

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
        <Filters selectedFilters={selectedFilters} onChange={handleFiltersChange} />
      </div>
    </div>
  );
};
