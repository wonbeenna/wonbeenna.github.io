interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className="mx-auto my-0 max-w-[970px] p-4 pb-40">{children}</section>;
};

export default Section;
