import { Button } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import q from 'query-string';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Filters } from 'ui/app/Layout/Search/Filters';

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleClick = async () => {
    if (searchTerm === '') {
      return;
    }

    const searchParams = {
      query: searchTerm,
    };

    history.push(`/search?` + q.stringify(searchParams));
  };

  const handleEnterKey: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearchTerm(e.target.value);
  };

  const handleFiltersChange: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    console.log('filters will be changed.');
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
        rightElement={<Button text="Search" onClick={handleClick} />}
      />

      <div className="mt-1">
        <Filters onSubmit={handleFiltersChange} />
      </div>
    </div>
  );
};
