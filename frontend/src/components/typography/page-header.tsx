import { cx } from 'class-variance-authority';

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
  return (
    <h2
      className={cx(
        'text-2xl font-semibold tracking-tight text-gray-800',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default PageHeader;
