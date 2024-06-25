import { EBreadcrumb, EBreadcrumbs } from '@elvia/elvis-breadcrumbs-lit/react';
import { Header } from '@elvia/elvis-header/react';
import { Icon } from '@elvia/elvis-icon/react';
import { Toast } from '@elvia/elvis-toast/react';
import { Link, Outlet } from 'react-router-dom';

import './App.scss';

function App() {
  const links = [
    { url: '/', name: 'Home' },
    { url: '/search', name: 'Brand' },
    { url: '/search/icon', name: 'Icons' },
  ];

  return (
    <Header
      appTitle="Louvre"
      email="kristine.leonardsen@elvia.no"
      username="Kristine Leonardsen"
      navItems={
        <div className="e-sidenav__container">
          <Link to="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
            <div className="e-sidenav__icon-container">
              <Icon name="dashboard" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Dashbord</div>
          </Link>
          <Link to="/search" className="e-sidenav__item" aria-label="Søk">
            <div className="e-sidenav__icon-container">
              <Icon name="search" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Søk</div>
          </Link>
          <Link to="/pin" className="e-sidenav__item" aria-label="Analyse">
            <div className="e-sidenav__icon-container">
              <Icon name="pin" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Analyse</div>
          </Link>
        </div>
      }
      pageTitle="Components"
      appContent={
        <div className="App e-pt-40">
          <Toast />
          <EBreadcrumbs>
            {links.map((link) => (
              <EBreadcrumb key={link.name}>
                <Link to={link.url}>{link.name}</Link>
              </EBreadcrumb>
            ))}
          </EBreadcrumbs>
          <h1 className="e-mt-0">React Preview</h1>
          <div className="components-examples">
            <Outlet />
          </div>
        </div>
      }
    ></Header>
  );
}

export default App;
