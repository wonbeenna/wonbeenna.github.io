interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className="mx-auto max-w-6xl px-6 py-16">{children}</section>;
};

export default Section;
