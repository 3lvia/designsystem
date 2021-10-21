import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import 'jsdom-global/register';
import { Accordion } from '@elvia/elvis-accordion/react';
import enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
enzyme.configure({ adapter: new Adapter() });

// test('renders learn react app', () => {
//   render(<App />);
// });

it("should render my component", () => {
  const wrapper = enzyme.shallow(<Accordion />);
});
