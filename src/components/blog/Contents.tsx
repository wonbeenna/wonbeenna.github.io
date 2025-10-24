'use client';

import '../../styles/prism.css';
import { JSXElementConstructor, ReactElement } from 'react';

const Contents = (props: { component: ReactElement<unknown, string | JSXElementConstructor<any>> }) => {
  return <section>{props.component}</section>;
};

export default Contents;
