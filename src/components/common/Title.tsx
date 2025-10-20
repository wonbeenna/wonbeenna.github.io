interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <h1 id={`${title}-heading`} className="mb-12 text-3xl font-extrabold tracking-tight">
      {title}
    </h1>
  );
};

export default Title;
