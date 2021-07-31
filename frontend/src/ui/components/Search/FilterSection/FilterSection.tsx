import { Button, Card, Collapse, Tab, Tabs } from '@blueprintjs/core';
import React, { useState } from 'react';
import { FilterCheckboxes } from 'ui/components/Search/FilterSection/FilterCheckboxes/FilterCheckboxes';
import { cuisines } from 'ui/components/Search/FilterSection/res/cuisines';
import { diets } from 'ui/components/Search/FilterSection/res/diets';
import { intolerances } from 'ui/components/Search/FilterSection/res/intolerances';
import { mealTypes } from 'ui/components/Search/FilterSection/res/mealTypes';
import { Filters } from 'ui/types/Filters';
import './FilterSection.scss';

export const FilterSection: React.FC<FilterSectionProps> = ({ selectedFilters, onChange, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCollapseToggle = () => setIsOpen(prev => !prev);

  const handleFilterChange = (selected: string[], keyName: string) => {
    const updatedFilters = { filters: { ...selectedFilters.filters, [keyName]: selected } };

    onChange(updatedFilters);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <>
      <div className="text-center mb-2">
        <button className="filters__open-button" onClick={handleCollapseToggle}>
          {'<'} Advanced Search Options {'>'}
        </button>
      </div>

      <Collapse isOpen={isOpen}>
        <Card style={{ backgroundColor: 'white' }}>
          <form onSubmit={handleSubmit}>
            <Tabs vertical>
              <Tab
                id="cuisines"
                title="Cuisines"
                panel={
                  <FilterCheckboxes
                    filterValues={cuisines}
                    selectedFilters={selectedFilters}
                    onChange={handleFilterChange}
                    filterKey="cuisines"
                  />
                }
              />

              <Tab
                id="diets"
                title="Diets"
                panel={
                  <FilterCheckboxes
                    filterValues={diets}
                    selectedFilters={selectedFilters}
                    onChange={handleFilterChange}
                    filterKey="diets"
                  />
                }
              />

              <Tab
                id="mealTypes"
                title="Meal Types"
                panel={
                  <FilterCheckboxes
                    filterValues={mealTypes}
                    selectedFilters={selectedFilters}
                    onChange={handleFilterChange}
                    filterKey="mealTypes"
                  />
                }
              />

              <Tab
                id="intolerances"
                title="Intolerances"
                panel={
                  <FilterCheckboxes
                    filterValues={intolerances}
                    selectedFilters={selectedFilters}
                    onChange={handleFilterChange}
                    filterKey="intolerances"
                  />
                }
              />
            </Tabs>

            <div className="text-right">
              <Button type="submit">Set Filters</Button>
            </div>
          </form>
        </Card>
      </Collapse>
    </>
  );
};

interface FilterSectionProps {
  selectedFilters: Filters;
  onChange(newFilters: Filters): void;
  onSubmit(): void;
}
