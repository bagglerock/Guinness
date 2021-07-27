import { Card, Collapse } from '@blueprintjs/core';
import React, { useState } from 'react';
import './Filters.scss';

export const Filters: React.FC<FiltersProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCollapseToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div className="text-center">
        <button className="filters__open-button" onClick={handleCollapseToggle}>
          {'<'} Advanced Search Options {'>'}
        </button>
      </div>

      <Collapse isOpen={isOpen}>
        <Card style={{ backgroundColor: 'tan' }}>
          <form onSubmit={onSubmit}>
            <button type="submit">Submit</button>
          </form>
        </Card>
      </Collapse>
    </>
  );
};

interface FiltersProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}
