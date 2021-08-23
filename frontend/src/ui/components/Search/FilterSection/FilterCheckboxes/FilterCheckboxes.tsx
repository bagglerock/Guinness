import { Checkbox } from '@blueprintjs/core';
import { compact, concat, includes, map, pull } from 'lodash';
import React from 'react';
import { Filters } from 'ui/types/Filters';

export const FilterCheckboxes: React.FC<FilterCheckboxesProps> = ({ filterKey, filterValues, selectedFilters, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    const nextSelections = includes(selectedFilters[filterKey], value)
      ? pull(selectedFilters[filterKey], value)
      : compact(concat(selectedFilters[filterKey], value));

    onChange(nextSelections, filterKey);
  };

  return (
    <div className="border-left h-100 pl-3">
      {map(filterValues, filter => (
        <Checkbox
          key={filter}
          className="mr-4"
          style={{ fontSize: '.9em' }}
          inline
          label={filter}
          value={filter}
          checked={includes(selectedFilters[filterKey], filter)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

interface FilterCheckboxesProps {
  filterKey: string;
  filterValues: string[];
  selectedFilters: Filters;
  onChange(selected: string[], keyName: string): void;
}
