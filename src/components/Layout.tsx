import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Calendar, History, UserCircle } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(45,51,53,0.06)]">
        <div className="flex justify-between items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-primary font-headline">
            Culinary Bill
          </div>
          <nav className="hidden md:flex items-center space-x-8 font-headline text-sm tracking-tight font-medium">
            <button 
              onClick={() => onPageChange('new-bill')}
              className={`${currentPage === 'new-bill' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'} transition-all cursor-pointer`}
            >
              New Bill
            </button>
            <button 
              onClick={() => onPageChange('monthly-report')}
              className={`${currentPage === 'monthly-report' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'} transition-all cursor-pointer`}
            >
              Monthly Report
            </button>
            <button 
              onClick={() => onPageChange('history')}
              className={`${currentPage === 'history' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'} transition-all cursor-pointer`}
            >
              History
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
              <UserCircle size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-32 md:pb-12">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 px-4 pb-safe md:hidden bg-white/80 backdrop-blur-xl border-t border-slate-100/20 shadow-[0_-10px_30px_rgba(45,51,53,0.04)] z-50 rounded-t-3xl">
        <button 
          onClick={() => onPageChange('new-bill')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${currentPage === 'new-bill' ? 'text-primary bg-primary-container/20 rounded-xl px-4 py-1' : 'text-on-surface-variant'}`}
        >
          <PlusCircle size={20} />
          <span className="font-headline text-[10px] font-semibold uppercase tracking-widest">New Bill</span>
        </button>
        <button 
          onClick={() => onPageChange('monthly-report')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${currentPage === 'monthly-report' ? 'text-primary bg-primary-container/20 rounded-xl px-4 py-1' : 'text-on-surface-variant'}`}
        >
          <Calendar size={20} />
          <span className="font-headline text-[10px] font-semibold uppercase tracking-widest">Monthly</span>
        </button>
        <button 
          onClick={() => onPageChange('history')}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${currentPage === 'history' ? 'text-primary bg-primary-container/20 rounded-xl px-4 py-1' : 'text-on-surface-variant'}`}
        >
          <History size={20} />
          <span className="font-headline text-[10px] font-semibold uppercase tracking-widest">History</span>
        </button>
      </nav>
    </div>
  );
};
