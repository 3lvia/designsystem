import { render } from '@testing-library/react';
import React from 'react';

import Spotlight from './elvia-spotlight';

describe('Elvis Spotlight', () => {
  it('uses the default rectangle props', () => {
    const { container } = render(
      <Spotlight position={{ horizontal: 100, vertical: 100 }} shape="rectangle" />,
    );

    const rect = container.querySelector('rect[fill="black"]');
    expect(rect).toHaveAttribute('width', '200');
    expect(rect).toHaveAttribute('height', '200');
    expect(rect).toHaveAttribute('rx', '8');
    expect(rect).toHaveAttribute('ry', '8');
  });

  it('merges provided rectangle props with defaults', () => {
    const { container } = render(
      <Spotlight
        position={{ horizontal: 100, vertical: 100 }}
        rectangleProps={{ width: 100 }}
        shape="rectangle"
      />,
    );

    const rect = container.querySelector('rect[fill="black"]');
    expect(rect).toHaveAttribute('width', '100');
    expect(rect).toHaveAttribute('height', '200');
    expect(rect).toHaveAttribute('rx', '8');
    expect(rect).toHaveAttribute('ry', '8');
  });
});
