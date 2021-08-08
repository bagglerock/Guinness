import { Button } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React from 'react';
import { FilterSection } from 'ui/components/Search/FilterSection/FilterSection';
import { useSearch } from 'ui/components/Search/hooks/useSearch';
import { Filters } from 'ui/types/Filters';

export const Search: React.FC = () => {
  const { parameters, setParameters, handleSearch } = useSearch();

  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => setParameters({ ...parameters, query: event.target.value });

  const handleFiltersChange = (updatedFilters: Filters) => setParameters({ ...parameters, filters: { ...updatedFilters } });

  return (
    <div className="bg-danger p-3">
      <InputGroup
        onChange={handleChange}
        value={parameters.query}
        fill={true}
        large={true}
        round={true}
        onKeyDown={handleEnterKey}
        leftIcon="search"
        maxLength={55}
        rightElement={<Button text="Search" onClick={handleSearch} />}
      />

      <div className="mt-1">
        <FilterSection
          selectedFilters={parameters.filters}
          onChange={handleFiltersChange}
          onSubmit={handleSearch}
          shouldDisable={parameters.query === ''}
        />
      </div>
    </div>
  );
};
