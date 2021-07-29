import { Card } from '@blueprintjs/core';
import React from 'react';

export const ErrorView = (): JSX.Element => (
  <div className="d-flex align-items-center justify-content-center h-100">
    <Card style={{ backgroundColor: '#ffdddd', border: '1px solid red', width: '80%', textAlign: 'center' }}>
      There was an error getting the data.
    </Card>
  </div>
);
