import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm-v2 mb-3.5">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-2">
            {idx > 0 && <span className="text-icon-soft mx-2 transform scale-125 mb-1">›</span>}
            {item.to && !isLast ? (
              <Link to={item.to} className="text-text-soft hover:text-text-muted">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-text-muted' : ''}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
