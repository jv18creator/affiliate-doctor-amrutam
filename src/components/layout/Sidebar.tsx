import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../../store/sidebar';

import DashboardIcon from '../../icons/dashboard.svg?react';
import PatientsIcon from '../../icons/patients.svg?react';
import ScheduleIcon from '../../icons/schedule.svg?react';
import AppointmentsIcon from '../../icons/appointments.svg?react';
import ChatIcon from '../../icons/chat.svg?react';
import ConsultationIcon from '../../icons/coupon.svg?react';
import WalletIcon from '../../icons/wallet.svg?react';
import AffiliateIcon from '../../icons/forum.svg?react';
import ChevronDown from '../../icons/chevron-down-sm.svg?react';
import ChevronRight from '../../icons/chevron-right-sm.svg?react';
import { isTabSize } from '../../utils';

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface SidebarChild {
  label: string;
  path: string;
}

interface SidebarItem {
  key: string;
  label: string;
  icon: SvgIcon;
  path?: string;
  children?: SidebarChild[];
}

const sidebarItems: SidebarItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
  },
  { key: 'patients', label: 'Patients', icon: PatientsIcon, path: '/patients' },
  {
    key: 'schedule',
    label: 'Doctor Schedule',
    icon: ScheduleIcon,
    path: '/schedule',
  },
  {
    key: 'appointments',
    label: 'Appointments',
    icon: AppointmentsIcon,
    path: '/appointments',
  },
  { key: 'chat', label: 'Chat', icon: ChatIcon, path: '/chat' },
  {
    key: 'consultation',
    label: 'Consultation',
    icon: ConsultationIcon,
    path: '/consultation',
  },

  {
    key: 'wallet',
    label: 'Wallet',
    icon: WalletIcon,
    children: [
      { label: 'Overview', path: '/wallet/overview' },
      { label: 'Withdraw', path: '/wallet/withdraw' },
    ],
  },
  {
    key: 'affiliate',
    label: 'Affiliate',
    icon: AffiliateIcon,
    children: [
      { label: 'Dashboard', path: '/affiliate/dashboard' },
      { label: 'Referral Tool', path: '/affiliate/referral-tool' },
      { label: 'Earning History', path: '/affiliate/earning-history' },
    ],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isOpen, close } = useSidebarStore();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    wallet: false,
    affiliate: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`${
        isOpen ? 'flex' : 'hidden'
      } fixed lg:sticky lg:top-[92px] lg:max-h-[calc(100dvh-92px)] max-h-dvh overflow-y-auto ove lg:mt-5 lg:rounded-tr-4xl inset-y-0 left-0 z-30 min-w-64 bg-surface border-r border-border-subtle flex-col shadow-lg lg:shadow-md`}
    >
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm-v2 font-medium text-text-main uppercase tracking-wide hidden lg:inline">
            Main
          </span>
          <img src="/logo.svg" alt="Amrutam" className="h-6 lg:hidden" />
        </div>

        <button
          type="button"
          onClick={close}
          className="lg:hidden p-1.5 rounded-full bg-surface-muted cursor-pointer"
        >
          <img src="/icons/close.svg" alt="Close sidebar" className="w-3 h-3" />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-2 overflow-y-auto pb-4">
        {sidebarItems.map(item => {
          const Icon = item.icon;
          const hasChildren = !!item.children && item.children.length > 0;
          const sectionOpen = hasChildren ? !!openSections[item.key] : false;

          const childActive = hasChildren
            ? item.children!.some(child =>
                location.pathname.startsWith(child.path),
              )
            : false;

          const selfActive =
            item.path && location.pathname.startsWith(item.path);

          const isActive = childActive || selfActive;

          if (hasChildren) {
            return (
              <div key={item.key} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleSection(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-surface-muted ${
                    isActive ? 'text-primary font-semibold' : 'text-text-soft'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm-v2 font-medium">
                    <div className="bg-filled-field p-2.5 rounded-lg">
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>

                    {item.label}
                  </span>
                  {sectionOpen ? (
                    <ChevronDown className="w-2 h-2 opacity-80" />
                  ) : (
                    <ChevronRight className="w-2 h-2 opacity-80" />
                  )}
                </button>

                {sectionOpen && (
                  <div className="mt-1 space-y-1">
                    {item.children!.map(child => (
                      <SidebarLink
                        key={child.path}
                        to={child.path}
                        label={child.label}
                        active={location.pathname.startsWith(child.path)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Simple link item
          if (item.path) {
            return (
              <NavLink
                key={item.key}
                to={item.path}
                onClick={isTabSize ? close : undefined}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm-v2 font-medium hover:bg-surface-muted text-text-soft"
              >
                <div className="bg-filled-field p-2.5 rounded-lg">
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                {item.label}
              </NavLink>
            );
          }

          // Fallback non-link item (no path, no children)
          return (
            <button
              key={item.key}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-surface-muted text-text-main"
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, active }) => {
  const { close } = useSidebarStore();
  return (
    <NavLink
      to={to}
      className={`w-full flex items-center gap-3 pl-16 pr-3 py-2 rounded-xl text-sm ${
        active
          ? 'text-primary font-medium'
          : 'text-text-soft hover:bg-surface-muted'
      }`}
      onClick={isTabSize ? close : undefined}
    >
      {label}
    </NavLink>
  );
};

export default Sidebar;
