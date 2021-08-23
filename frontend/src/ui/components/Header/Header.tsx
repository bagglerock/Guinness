import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => (
  <div className="header">
    <Link to="/" className="header-title">
      Chef's Den
    </Link>
  </div>
);
