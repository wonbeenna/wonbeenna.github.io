import { ReactNode } from 'react';

interface PhotoInfoListProps {
  children: ReactNode;
}

const PhotoInfoList = ({ children }: PhotoInfoListProps) => {
  return <dl className="grid gap-1 text-sm text-white drop-shadow">{children}</dl>;
};

export default PhotoInfoList;
