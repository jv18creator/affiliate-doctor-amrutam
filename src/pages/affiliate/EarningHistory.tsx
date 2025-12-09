import { useMemo, useState } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import SearchInput from '../../components/common/SearchInput';
import IconButton from '../../components/common/IconButton';
import Table, { type Column } from '../../components/common/Table';
import Pagination from '../../components/common/Pagination';
import Badge from '../../components/common/Badge';

interface EarningRow {
  id: number;
  productName: string;
  date: string;
  time: string;
  coupon: string;
  commission: string;
  earning: number;
  status: 'Paid' | 'Pending';
}

const ROWS: EarningRow[] = [
  {
    id: 1,
    productName: 'Amrutam Nari Sondarya Malt',
    date: '19 Oct, 2024',
    time: '04 : 10 PM',
    coupon: 'AMU2344',
    commission: '15%',
    earning: 120,
    status: 'Paid',
  },
  {
    id: 2,
    productName: 'Amrutam Nari Sondarya Malt',
    date: '19 Oct, 2024',
    time: '05 : 10 PM',
    coupon: 'AMU2344',
    commission: '15%',
    earning: 112,
    status: 'Paid',
  },
  {
    id: 3,
    productName: 'Amrutam Nari Sondarya Malt',
    date: '18 Oct, 2024',
    time: '06 : 10 PM',
    coupon: 'AMU2344',
    commission: '25%',
    earning: 82,
    status: 'Pending',
  },
];

const EarningHistory = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ROWS;
    return ROWS.filter(row => row.productName.toLowerCase().includes(q));
  }, [search]);

  const rowsForPage = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const columns: Column<EarningRow>[] = [
    {
      key: 'select',
      header: '',
      render: () => (
        <input
          type="checkbox"
          aria-label='checkbox'
          className="w-4 h-4 rounded border-border-strong accent-primary"
        />
      ),
    },
    {
      key: 'sno',
      header: 'S. No.',
      render: (_row, idx) => idx + 1,
    },
    {
      key: 'productName',
      header: 'Product Name',
      render: row => (
        <div className="flex items-center gap-3 min-w-[280px]">
          <img
            src="/images/product.png"
            alt={row.productName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm">{row.productName}</span>
            {row.id === 1 && (
              <Badge content='New' status='warning' />
            )}
          </div>
        </div>
      ),
    },
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time' },
    { key: 'coupon', header: 'Coupon/Link' },
    { key: 'commission', header: 'Commission' },
    {
      key: 'earning',
      header: 'Earning',
      render: row => <span>INR {row.earning}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <span
          className={
            row.status === 'Paid'
              ? 'text-success font-medium'
              : 'text-danger font-medium'
          }
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Affiliate', to: '/affiliate/dashboard' },
          { label: 'Earning History' },
        ]}
      />

      <div className="bg-surface rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="text-base font-semibold text-text-main">
            Earning History
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SearchInput
              placeholder="Search here"
              value={search}
              onChange={setSearch}
            />
            <IconButton icon="/icons/refresh.svg" label="Refresh" />
            <IconButton icon="/icons/sort.svg" label="Sort" />
            <IconButton icon="/icons/filter.svg" label="Filter" />
          </div>
        </div>

        <Table columns={columns} rows={rowsForPage} getRowId={row => row.id} />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={filteredRows.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default EarningHistory;
