import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import StatCard from '../../components/common/StatCard';
import FloatingLabelSelect, {
  type Option,
} from '../../components/common/FloatingLabelSelect';
import { useNavigate, useParams } from 'react-router-dom';

interface ProductStats {
  referrals: number;
  orders: number;
  revenue: number;
  links: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  link: string;
  coupon: string;
  stats: ProductStats;
}

const PRODUCTS: Product[] = [
  {
    id: 'nari-sondarya-malt',
    name: 'Amrutam Nari Sondarya Malt',
    image: '/images/product-large.png',
    link: 'https://www.amrutam.global/nari-sondarya-malt?',
    coupon: 'AMU7382478',
    stats: {
      referrals: 255,
      orders: 55,
      revenue: 5540,
      links: 5,
    },
  },
];

const ReferralTool = () => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const { productId } = useParams<{ productId?: string }>();

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId);
  const productOptions: Option[] = PRODUCTS.map(p => ({
    value: p.id,
    label: p.name,
  }));

  useEffect(() => {
    if (productId && productId !== selectedProductId) {
      const exists = PRODUCTS.some(p => p.id === productId);
      if (exists) {
        setSelectedProductId(productId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleSelect = (id: string) => {
    setSelectedProductId(id);
    if (id) {
      navigate(`/affiliate/referral-tool/${id}`, { replace: false });
    } else {
      navigate('/affiliate/referral-tool', { replace: true });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert('Clipboard not available');
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Affiliate', to: '/affiliate/dashboard' },
          { label: 'Referral Tool' },
        ]}
      />

      <div className="bg-surface rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <div className="text-sm font-semibold text-text-main mb-2">
            Product Link/Coupon
          </div>
          <div className="flex mt-10 flex-col md:flex-row gap-3 items-stretch md:items-center w-full">
            <div className="flex-1 max-w-[500px]">
              <FloatingLabelSelect
                label="Enter the name of Product"
                required
                value={selectedProductId}
                onChange={handleSelect}
                placeholder="Enter or Select the name of product you want to refer to your patient."
                options={productOptions}
              />
            </div>
          </div>
          {!selectedProduct ? (
            <div className="flex justify-end">
              <button className="px-20 h-10 rounded-xl bg-primary text-surface text-sm font-medium">
                Get
              </button>
            </div>
          ) : null}
        </div>

        {selectedProduct && (
          <div className="flex gap-6 justify-between flex-wrap">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-xs rounded-2xl object-cover"
            />

            <div className="space-y-4 flex-1">
              <div>
                <label className="text-[11px] text-text-soft mb-1 block">
                  Product Link
                </label>
                <div className="flex gap-3 justify-between">
                  <input
                    readOnly
                    value={selectedProduct.link}
                    aria-label="product link"
                    className="flex-1 border max-w-[500px] border-border-subtle rounded-xl px-3 py-2 text-sm bg-surface-subtle truncate"
                  />
                  <button
                    onClick={() => handleCopy(selectedProduct.link)}
                    className="w-24 h-10 rounded-xl bg-primary text-surface text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-text-soft mb-1 block">
                  Product Coupon Code
                </label>
                <div className="flex gap-3 justify-between">
                  <input
                    readOnly
                    value={selectedProduct.coupon}
                    className="flex-1 border max-w-[500px] border-border-subtle rounded-xl px-3 py-2 text-sm bg-surface-subtle"
                  />
                  <button
                    onClick={() => handleCopy(selectedProduct.coupon)}
                    className="w-24 h-10 rounded-xl bg-primary text-surface text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="text-sm text-text-main italic mt-2">
          Note: Share this Link/Coupon with your patient. For every purchase
          someone makes using your Link/Coupon, you get credit.
        </p>
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
          <StatCard
            label="Total Referral"
            value={selectedProduct.stats.referrals}
            iconSrc="/icons/calendar-referral.svg"
          />
          <StatCard
            label="Total Orders"
            value={selectedProduct.stats.orders}
            iconSrc="/icons/total-orders.svg"
          />
          <StatCard
            label="Total Revenue"
            value={selectedProduct.stats.revenue}
            iconSrc="/icons/total-revenue.svg"
          />
          <StatCard
            label="Total Link/Coupon"
            value={selectedProduct.stats.links}
            iconSrc="/icons/total-coupon.svg"
          />
        </div>
      )}

      <div className="bg-surface rounded-2xl shadow-sm p-6 mt-6">
        <div className="text-base font-semibold text-text-main mb-2">
          Cart Discount
        </div>
        <div className="flex flex-col justify-between md:flex-row gap-3 items-stretch md:items-center">
          <input
            readOnly
            value="DRLIAM2374"
            className="flex-1 max-w-[500px] border border-border-subtle rounded-xl px-3 py-2 text-sm bg-surface-subtle"
          />
          <button
            onClick={() => handleCopy('DRLIAM2374')}
            className="px-20 py-2 rounded-lg bg-primary text-surface text-sm"
          >
            Copy
          </button>
        </div>
        <p className="text-sm italic text-text-main text-center mt-5 ">
          Note: Share this Link/Coupon with your patient. For every purchase
          someone makes using your Link/Coupon. You get credit.
        </p>
      </div>
    </div>
  );
};

export default ReferralTool;
