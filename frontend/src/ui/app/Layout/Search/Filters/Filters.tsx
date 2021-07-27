import { Card, Checkbox, Collapse, Tab, Tabs } from '@blueprintjs/core';
import { map } from 'lodash';
import React, { useState } from 'react';
import { cuisines } from 'ui/app/Layout/Search/Filters/res/cuisines';
import { diets } from 'ui/app/Layout/Search/Filters/res/diets';
import { intolerances } from 'ui/app/Layout/Search/Filters/res/intolerances';
import { mealTypes } from 'ui/app/Layout/Search/Filters/res/mealTypes';
import './Filters.scss';

export const Filters: React.FC<FiltersProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapseToggle = () => {
    setIsOpen(prev => !prev);
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
          <form onSubmit={onSubmit}>
            <Tabs vertical>
              <Tab id="cuisines" title="Cuisines" panel={<FilterCheckboxes filters={cuisines} />} />
              <Tab id="diet" title="Diet" panel={<FilterCheckboxes filters={diets} />} />
              <Tab id="type" title="Type" panel={<FilterCheckboxes filters={mealTypes} />} />
              <Tab id="intolerances" title="Intolerances" panel={<FilterCheckboxes filters={intolerances} />} />
            </Tabs>

            <div className="text-right">
              <button type="submit">Submit</button>
            </div>
          </form>
        </Card>
      </Collapse>
    </>
  );
};

interface FiltersProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const FilterCheckboxes: React.FC<FilterCheckboxesProps> = ({ filters }) => (
  <div className="border-left h-100 pl-3">
    {map(filters, filter => (
      <Checkbox key={filter} className="mr-4" inline label={filter} />
    ))}
  </div>
);

interface FilterCheckboxesProps {
  filters: string[];
}
