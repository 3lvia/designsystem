import Badge from './elvia-badge.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey90: getColor('grey-90'),
};
