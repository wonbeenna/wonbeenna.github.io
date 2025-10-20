'use client';

import '../../styles/prism.css';
import { JSXElementConstructor, ReactElement } from 'react';

const Contents = (props: { component: ReactElement<unknown, string | JSXElementConstructor<any>> }) => {
  return props.component;
};

export default Contents;
