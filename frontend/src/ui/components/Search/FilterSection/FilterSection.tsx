import { Button, Card, Collapse, Tab, Tabs } from '@blueprintjs/core';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { FilterCheckboxes } from 'ui/components/Search/FilterSection/FilterCheckboxes/FilterCheckboxes';
import { cuisines } from 'ui/components/Search/FilterSection/res/cuisines';
import { diets } from 'ui/components/Search/FilterSection/res/diets';
import { intolerances } from 'ui/components/Search/FilterSection/res/intolerances';
import { mealTypes } from 'ui/components/Search/FilterSection/res/mealTypes';
import { Filters } from 'ui/types/Filters';
import './FilterSection.scss';

export const FilterSection: React.FC<FilterSectionProps> = ({ selectedFilters, onChange, onSubmit, shouldDisable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCollapseToggle = () => setIsOpen(prev => !prev);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleFilterChange = (selected: string[], keyName: string) => {
    const updatedFilters = { ...selectedFilters, [keyName]: selected };

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
          {'<'} Advanced Search {'>'}
        </button>
      </div>

      <Collapse isOpen={isOpen}>
        <Card style={{ backgroundColor: 'white' }}>
          {shouldDisable ? (
            <div className="d-flex align-items-center justify-content-center h-100">Filters cannot be shown without a search term.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs vertical>
                {map(tabMap, tab => (
                  <Tab
                    key={tab.filterKey}
                    id={tab.filterKey}
                    title={tab.title}
                    panel={
                      <FilterCheckboxes
                        filterValues={tab.filterValues}
                        selectedFilters={selectedFilters}
                        onChange={handleFilterChange}
                        filterKey={tab.filterKey}
                      />
                    }
                  />
                ))}
              </Tabs>

              <div className="text-end">
                <Button type="submit">Set Filters</Button>
              </div>
            </form>
          )}
        </Card>
      </Collapse>
    </>
  );
};

interface FilterSectionProps {
  selectedFilters: Filters;
  onChange(newFilters: Filters): void;
  onSubmit(): void;
  shouldDisable: boolean;
}

const tabMap = [
  { title: 'Cuisines', filterKey: 'cuisines', filterValues: cuisines },
  { title: 'Diets', filterKey: 'diets', filterValues: diets },
  { title: 'Meal Types', filterKey: 'mealTypes', filterValues: mealTypes },
  { title: 'Intolerances', filterKey: 'intolerances', filterValues: intolerances },
];
