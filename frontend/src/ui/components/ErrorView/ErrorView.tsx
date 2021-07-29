import { Card } from '@blueprintjs/core';
import React from 'react';
import './ErrorView.scss';

export const ErrorView = (): JSX.Element => (
  <div className="d-flex align-items-center justify-content-center h-100">
    <Card className="error-view">There was an error getting the data.</Card>
  </div>
);
