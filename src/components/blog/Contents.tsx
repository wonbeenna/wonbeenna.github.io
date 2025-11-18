import '../../styles/prism.css';
import { ReactElement } from 'react';

const Contents = (props: { component: ReactElement }) => {
  return <section>{props.component}</section>;
};

export default Contents;
