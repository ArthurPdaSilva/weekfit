import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/auth';

export default function HeaderContainer() {
  const appContext = useContext(AuthContext);

  return (
    <Menu fluid inverted style={{ borderRadius: 0, fontSize: '1.2rem' }}>
      <Menu.Item as={Link} to="/home" header>
        <Image src="assets/icon.png" style={{ marginRight: '.5em' }} />
        Week Fit
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>{appContext?.user?.name}</Menu.Item>
        <Menu.Item name="Sair" onClick={() => appContext?.logout()} />
      </Menu.Menu>
    </Menu>
  );
}
