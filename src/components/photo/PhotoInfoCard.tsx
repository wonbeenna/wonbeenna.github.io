import { ReactNode } from 'react';

interface PhotoInfoCardProps {
  title: ReactNode;
  description: ReactNode;
}

const PhotoInfoCard = ({ title, description }: PhotoInfoCardProps) => {
  return (
    <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
      <dt className="opacity-80">{title}</dt>
      <dd className="truncate font-medium">{description || '-'}</dd>
    </div>
  );
};

export default PhotoInfoCard;
