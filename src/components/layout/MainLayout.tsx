import { type ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useSidebarStore } from '../../store/sidebar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const { isOpen, close } = useSidebarStore();

  return (
    <div className="min-h-screen bg-page text-text-main flex flex-col relative font-poppins">
      <Topbar />

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={close}
        />
      )}

      <div className="flex flex-1">
        <Sidebar />
        <main
          className="
    w-full 
    lg:px-8 px-5
    pl-5! 
    py-6 
    relative 
    z-10 
    overflow-x-visible
    max-w-laptop mx-auto
  "
        >
          {children ?? <Outlet key={location.pathname} />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
