import { ReactNode } from 'react';

interface PhotoInfoListProps {
  children: ReactNode;
}

const PhotoInfoList = ({ children }: PhotoInfoListProps) => {
  return <dl className="grid gap-1 text-sm">{children}</dl>;
};

export default PhotoInfoList;
