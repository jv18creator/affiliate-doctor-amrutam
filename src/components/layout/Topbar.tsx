import React from 'react';
import { useSidebarStore } from '../../store/sidebar';

const Topbar: React.FC = () => {
  const toggleSidebar = useSidebarStore(state => state.toggle);

  return (
    <header className="bg-surface border-b border-border-subtle lg:sticky top-0 z-20 shadow-sm">
      <div className="h-[72px] gap-5 flex items-center px-5 justify-between">
        <div className="flex items-center gap-0 flex-1 ">
          <img src="/logo.svg" alt="Amrutam" className="h-8 hidden md:block" />

          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:ml-10 md:ml-4 ml-0 cursor-pointer"
          >
            <img src="/icons/bar.svg" alt="Menu" className="w-4 h-4" />
          </button>

          <div className="flex-1 md:max-w-[280px] max-w-52 lg:ml-8 md:ml-4 ml-2">
            <div className="flex items-center gap-2 bg-surface-muted rounded-xl md:p-3 p-2">
              <img src="/icons/topbar-search.svg" alt="" className="w-5 h-5" />
              <input
                type="text"
                aria-label="search"
                placeholder="Search here"
                className="bg-transparent placeholder:text-primary/50 outline-none text-sm max-w-[100px] md:max-w-xs md:flex-1"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center md:gap-6 gap-4">
          <button
            aria-label="messages"
            className="relative rounded-full cursor-pointer"
          >
            <img src="/icons/messages.svg" alt="Messages" className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger rounded-full" />
          </button>
          <button
            aria-label="notifications"
            className="relative rounded-full cursor-pointer"
          >
            <img
              src="/icons/notifications.svg"
              alt="Notifications"
              className="w-6 h-6"
            />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger rounded-full" />
          </button>

          <div className="flex items-center md:gap-6 gap-4">
            <div className="flex gap-2">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-primary">
                  Dr. Liam Michael
                </div>
                <div className="text-xs text-primary/50">Doctor</div>
              </div>
              <img
                src="/images/avatar.svg"
                alt="Dr. Liam Michael"
                className="w-10 h-10 rounded-2xl object-contain"
              />
            </div>
            <button className="rounded-full bg-surface-muted cursor-pointer">
              <img
                src="/icons/settings.svg"
                alt="Settings"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
