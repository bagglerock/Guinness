import { Checkbox } from '@blueprintjs/core';
import { compact, concat, includes, map, pull } from 'lodash';
import React from 'react';
import { FiltersModel } from 'ui/components/Search/Filters/FiltersModel';

export const FilterCheckboxes: React.FC<FilterCheckboxesProps> = ({ filterKey, filterValues, selectedFilters, onChange }) => {
  const { filters } = selectedFilters;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    const nextSelections = includes(filters[filterKey], value)
      ? pull(filters[filterKey], value)
      : compact(concat(filters[filterKey], value));

    onChange(nextSelections, filterKey);
  };

  return (
    <div className="border-left h-100 pl-3">
      {map(filterValues, filter => (
        <Checkbox
          key={filter}
          className="mr-4"
          inline
          label={filter}
          value={filter}
          checked={includes(filters[filterKey], filter)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

interface FilterCheckboxesProps {
  filterKey: string;
  filterValues: string[];
  selectedFilters: FiltersModel;
  onChange(selected: string[], keyName: string): void;
}
