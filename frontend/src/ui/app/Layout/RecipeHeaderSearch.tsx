import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';

export const RecipeHeaderSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleClick = async () => {
    if (searchTerm === '') {
      return;
    }

    history.push('/search');
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-danger" style={{ height: '30vh' }}>
      <InputGroup
        onChange={(e: any) => handleChange(e)}
        fill={true}
        large={true}
        round={true}
        leftIcon="search"
        rightElement={<Button text="Search" onClick={handleClick} />}
      />
    </div>
  );
};
