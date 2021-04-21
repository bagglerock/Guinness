import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import q from 'query-string';

export const RecipeSearch: React.FC = () => {
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

  const searchByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-danger">
      <InputGroup
        onChange={(e: any) => handleChange(e)}
        fill={true}
        large={true}
        round={true}
        onKeyDown={searchByEnter}
        leftIcon="search"
        maxLength={55}
        rightElement={<Button text="Search" onClick={handleClick} />}
      />
    </div>
  );
};
