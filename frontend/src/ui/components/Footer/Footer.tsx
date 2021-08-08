import moment from 'moment';
import React from 'react';
import './Footer.scss';

export const Footer: React.FC = () => {
  const currentYear = moment().format('YYYY');

  return <div className="footer">&copy;Chef's Den {currentYear}</div>;
};
