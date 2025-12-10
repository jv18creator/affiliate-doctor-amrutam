import React, { useMemo, useState } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import Tabs from '../../components/common/Tabs';
import StatCard from '../../components/common/StatCard';
import SearchInput from '../../components/common/SearchInput';
import IconButton from '../../components/common/IconButton';
import Table, { type Column } from '../../components/common/Table';
import Pagination from '../../components/common/Pagination';
import Badge from '../../components/common/Badge';

type TabValue = 'today' | 'week' | 'month' | 'custom';

const tabs = [
  { label: 'Today So Far', value: 'today' },
  { label: 'Week So Far', value: 'week' },
  { label: 'Month So Far', value: 'month' },
  { label: 'Custom', value: 'custom' },
];

interface ReferralRow {
  id: number;
  name: string;
  avatar: string;
  date: string;
  time: string;
  coupon: string;
  commission: string;
  clicks: number;
  orders: number;
  revenue: number;
  alt?: string;
}

const REFERRAL_ROWS: ReferralRow[] = [
  {
    id: 1,
    name: 'Andrea Lalema',
    avatar: '/images/andrea.png',
    date: '19 Oct, 2024',
    time: '04 : 10 PM',
    coupon: 'AMU2344',
    commission: '15%',
    clicks: 2,
    orders: 2,
    revenue: 345,
    alt: 'avatar of Andrea Lalema',
  },
  {
    id: 2,
    name: 'Smith Bruklin',
    avatar: '/images/smith.png',
    date: '19 Oct, 2024',
    time: '05 : 10 PM',
    coupon: 'AMU2344',
    commission: '15%',
    clicks: 4,
    orders: 4,
    revenue: 564,
    alt: 'avatar of Smith Bruklin',
  },
  {
    id: 3,
    name: 'William Stephin',
    avatar: '/images/william.png',
    date: '18 Oct, 2024',
    time: '06 : 10 PM',
    coupon: 'AMU2344',
    commission: '25%',
    clicks: 1,
    orders: 1,
    revenue: 200,
    alt: 'avatar of William Stephin',
  },
];

const AffiliateDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('month');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return REFERRAL_ROWS;
    return REFERRAL_ROWS.filter(
      row =>
        row.name.toLowerCase().includes(q) ||
        row.coupon.toLowerCase().includes(q),
    );
  }, [search]);

  const rowsForPage = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const columns: Column<ReferralRow>[] = [
    {
      key: 'select',
      header: '',
      render: () => (
        <input
          type="checkbox"
          aria-label="checkbox"
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
      key: 'name',
      header: 'Name',
      render: row => (
        <div className="flex items-center gap-2 lg:min-w-auto min-w-[160px]">
          <img
            src={row.avatar}
            alt={row.alt}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-2 relative">
            <span className="font-medium">{row.name}</span>
            {row.id === 1 && (
              <div className="absolute -right-8 -top-4">
                <Badge content="New" status="warning" />
              </div>
            )}
          </div>
        </div>
      ),
    },
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time' },
    { key: 'coupon', header: 'Coupon/Link' },
    { key: 'commission', header: 'Commission' },
    { key: 'clicks', header: 'Clicks' },
    { key: 'orders', header: 'Orders' },
    {
      key: 'revenue',
      header: 'Revenue',
      render: row => <span>{row.revenue}</span>,
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Affiliate', to: '/affiliate/dashboard' },
          { label: 'Dashboard' },
        ]}
      />

      <div className="mb-6">
        <Tabs
          value={activeTab}
          onChange={v => setActiveTab(v as TabValue)}
          tabs={tabs}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-4 mb-6">
        <StatCard
          label="Total Coupons clicks"
          value="255"
          suffix="/month"
          iconSrc="/icons/calendar-referral.svg"
        />
        <StatCard
          label="Total Orders"
          value="55"
          suffix="/month"
          iconSrc="/icons/total-orders.svg"
        />
        <StatCard
          label="Total Revenue"
          value="5,540"
          suffix="/month"
          iconSrc="/icons/total-revenue.svg"
        />
        <StatCard
          label="Total Link/Coupon"
          value="5"
          suffix="/month"
          iconSrc="/icons/total-coupon.svg"
        />
      </div>

      <div className="bg-surface rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-3 mb-4 justify-between">
          <div className="flex flex-wrap items-center gap-3.5">
            <div className="text-base font-semibold text-text-main">
              Referral Overview
            </div>
            <SearchInput
              placeholder="Search here"
              value={search}
              onChange={setSearch}
            />
            <div className="md:block hidden">
              <IconButton icon="/icons/refresh.svg" label="Refresh" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="md:hidden block">
              <IconButton icon="/icons/refresh.svg" label="Refresh" />
            </div>
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
    </>
  );
};

export default AffiliateDashboard;
