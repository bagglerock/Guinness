import { Spinner } from '@blueprintjs/core';
import React from 'react';

export const GenericLoadingView: React.FC = () => (
  <div className="d-flex align-items-center justify-content-center h-100">
    <Spinner />
  </div>
);
