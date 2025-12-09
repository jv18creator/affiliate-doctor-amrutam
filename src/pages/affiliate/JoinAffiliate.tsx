import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import AffiliateDashboard from './AffiliateDashboard';

const JoinAffiliate = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setOpen(false);
    navigate('/affiliate/dashboard');
  };

  return (
    <>
      <AffiliateDashboard />
      <Modal open={open} onClose={handleGetStarted}>
        <div className="flex flex-col items-center text-center gap-4">
          <img
            src="/images/affiliate-earnings.png"
            alt="Affiliate Earnings"
            className="w-40 h-40 object-contain mb-1"
          />
          <div className="space-y-2">
            <h2 className="text-[18px] font-semibold text-text-main">
              Introducing Affiliate Earnings
            </h2>
            <p className="text-[13px] text-text-soft leading-relaxed">
              Start earning by recommending Amrutam products in your patient
              routines. Get commissions for every successful referral through
              your unique link or coupon.
            </p>
          </div>
          <button
            onClick={handleGetStarted}
            className="mt-2 w-full h-11 cursor-pointer rounded-full bg-primary text-surface text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </Modal>
    </>
  );
};

export default JoinAffiliate;
