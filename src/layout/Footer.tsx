const Footer = () => {
  return (
    <footer className="border-t border-gray300 bg-white dark:bg-darkBg01">
      <div className="mx-auto flex max-w-[970px] flex-col items-center gap-2 p-6 text-sm text-gray700 dark:text-gray400">
        <p>© {new Date().getFullYear()} Been blog. All rights reserved.</p>
        <p>Design Inspired by muffinman.</p>
      </div>
    </footer>
  );
};

export default Footer;
