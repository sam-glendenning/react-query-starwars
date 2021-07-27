import React from 'react';

interface NavBarProps {
  setPage: (page: string) => void;
};

const NavBar = (props: NavBarProps): React.ReactElement => {
  return (
    <nav>
      <button onClick={() => props.setPage('planets')}>Planets</button>
      <button onClick={() => props.setPage('people')}>People</button>
    </nav>
  );
};

export default NavBar;