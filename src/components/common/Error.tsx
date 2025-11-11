'use client';

import Link from 'next/link';
import Section from '@/components/common/Section';

const Error = () => {
  return (
    <Section className="flex flex-col items-center justify-center text-center">
      <h1 className="typing typing-3ch text-[100px] font-extrabold leading-none text-gray900 dark:text-gray100 sm:text-[140px]">
        404
      </h1>

      <Link href="/" className="btn-learn-more mt-12">
        GO TO HOME
      </Link>
    </Section>
  );
};

export default Error;
