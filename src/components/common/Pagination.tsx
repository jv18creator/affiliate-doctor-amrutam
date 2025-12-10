import ChevronRight from '../../icons/chevron-right-sm.svg?react';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="flex items-center justify-between text-[11px] text-text-soft mt-4">
      <p className="font-medium text-xs-v2">Rows per page: {pageSize}</p>
      <div className="flex items-center gap-4">
        <span className="font-medium text-xs-v2">
          {start}-{end} of {total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="previous page"
            className="w-7 h-7 rounded-lg cursor-pointer transform rotate-180 border border-border-subtle flex items-center justify-center disabled:opacity-40"
          >
            <ChevronRight className="w-2.5 h-2.5 -ml-0.5" />
            <span className="hidden">previous page</span>
          </button>
          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="next page"
            className="w-7 h-7 rounded-lg cursor-pointer border border-border-subtle flex items-center justify-center disabled:opacity-40"
          >
            <ChevronRight className="w-2.5 h-2.5 -ml-0.5" />
            <span className="hidden">next page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
