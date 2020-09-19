import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { InputGroup } from '@blueprintjs/core/lib/esm/components/forms/inputGroup';
import React from 'react';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';

export const Search: React.FC = () => {
  const handleClick = async () => {
    const response = await recipeRepository.getByKeyword('pasta');

    console.log(response);
  };

  return (
    <div className="bg-danger" style={{ height: '30vh' }}>
      <InputGroup
        onChange={() => console.log('test')}
        fill={true}
        large={true}
        round={true}
        leftIcon="search"
        rightElement={<Button text="Search" onClick={handleClick} />}
      />
    </div>
  );
};
