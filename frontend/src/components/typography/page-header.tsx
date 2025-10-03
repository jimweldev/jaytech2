import { cx } from 'class-variance-authority';

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
  return (
    <h2 className={cx('text-2xl font-semibold text-2xl font-bold text-gray-800 tracking-tight', className) }>{children}</h2>
  );
};

export default PageHeader;
