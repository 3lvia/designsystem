import { EBreadcrumb, EBreadcrumbs } from '@elvia/elvis-breadcrumbs-lit/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb: React.FC = () => {
  const [links, setLinks] = useState([
    { url: '/', name: 'Home' },
    { url: '/search', name: 'Brand' },
    { url: '/search/icon', name: 'Icons' },
  ]);

  const changeBreadcrumb = (action: 'add' | 'remove') => {
    if (action === 'add') {
      setLinks((links) => {
        const listClone = links.slice();
        listClone.push({ name: 'New breadcrumb', url: '/brand/icon/foo' });
        return listClone;
      });
    } else {
      setLinks((links) => {
        const listClone = links.slice();
        listClone.pop();
        return listClone;
      });
    }
  };

  return (
    <div style={{ resize: 'horizontal', overflow: 'hidden', border: '1px solid black' }}>
      <EBreadcrumbs>
        {links.map((link, index) => (
          <EBreadcrumb key={index}>
            <Link to={link.url}>{link.name}</Link>
          </EBreadcrumb>
        ))}
      </EBreadcrumbs>
      <button onClick={() => changeBreadcrumb('add')}>Add breadcrumbs</button>
      <button onClick={() => changeBreadcrumb('remove')}>Remove breadcrumbs</button>
    </div>
  );
};
