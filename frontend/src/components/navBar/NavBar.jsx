import { useState } from 'react';
import NavBarContainer from './NavBarContainer';
import Brand from './Brand';
import MenuToggle from './MenuToggle';
import NavLinks from './NavLinks';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Brand
        w='100px'
        // color={['white', 'white', 'primary.500', 'primary.500']}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <NavLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

export default NavBar;
