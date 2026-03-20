import { useState, useMemo } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Receipt, 
  Share2, 
  Download, 
  Filter, 
  SortAsc, 
  MoreVertical, 
  FileText, 
  Search, 
  ChevronDown, 
  ArrowRight,
  Settings,
  CheckCircle2
} from 'lucide-react';
import { Layout } from './components/Layout';
import { ServiceSection } from './components/ServiceSection';
import { Page, BillItem, Transaction, ExportRecord } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('new-bill');
  
  // Mock Data for New Bill
  const [lunchItems, setLunchItems] = useState<BillItem[]>([
    { id: '1', name: 'Organic Himalayan Saffron', description: 'Garnish & Infusion', quantity: '2.5g', unitPrice: 450, total: 1125 },
    { id: '2', name: 'Farm-to-Table Sea Bass', description: 'Main Protein', quantity: '1.2kg', unitPrice: 1850, total: 2220 },
  ]);
  
  const [dinnerItems, setDinnerItems] = useState<BillItem[]>([
    { id: '3', name: 'Wagyu Beef Ribeye (A5)', description: 'Signature Main', quantity: '0.8kg', unitPrice: 6500, total: 5200 },
    { id: '4', name: 'Truffle Infused Virgin Oil', description: 'Finishing Oil', quantity: '1 unit', unitPrice: 2400, total: 2400 },
  ]);

  const grandTotal = useMemo(() => {
    const lunchTotal = lunchItems.reduce((acc, item) => acc + item.total, 0);
    const dinnerTotal = dinnerItems.reduce((acc, item) => acc + item.total, 0);
    return lunchTotal + dinnerTotal;
  }, [lunchItems, dinnerItems]);

  // Mock Data for Monthly Report
  const transactions: Transaction[] = [
    { id: 't1', date: 'Oct 24, 2023', client: 'Royal Horizon Hospitality', clientInitials: 'RH', total: 12450, status: 'PAID', type: 'LUNCH' },
    { id: 't2', date: 'Oct 22, 2023', client: 'Bistro Tech Sol', clientInitials: 'BT', total: 8200, status: 'PAID', type: 'DINNER' },
    { id: 't3', date: 'Oct 18, 2023', client: 'Crest Kitchens', clientInitials: 'CK', total: 15600, status: 'PENDING', type: 'LUNCH' },
    { id: 't4', date: 'Oct 15, 2023', client: 'Saffron Arts', clientInitials: 'SA', total: 5750, status: 'PAID', type: 'DINNER' },
  ];

  // Mock Data for History
  const exports: ExportRecord[] = [
    { id: 'e1', name: 'Summer Menu Final Costing', date: 'May 24, 2024', period: 'Q2 Review', size: '1.2 MB', type: 'pdf' },
    { id: 'e2', name: 'Weekly Inventory Recap', date: 'May 18, 2024', period: 'May 10 - May 17', size: '845 KB', type: 'doc' },
    { id: 'e3', name: 'Annual Vendor Audit', date: 'Apr 30, 2024', period: 'Fiscal Year 2023', size: '4.8 MB', type: 'pdf' },
  ];

  const renderNewBill = () => (
    <div className="max-w-5xl mx-auto px-6">
      <div className="mb-16 space-y-2">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary font-headline">Cooking Bill</h1>
        <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Client Reference</span>
            <span className="text-lg font-medium">Oberoi Estate Residences</span>
          </div>
          <div className="flex flex-col border-l border-outline-variant/20 pl-8">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Service Date</span>
            <span className="text-lg font-medium">14 March 2026</span>
          </div>
          <div className="flex flex-col border-l border-outline-variant/20 pl-8">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Invoice ID</span>
            <span className="text-lg font-semibold text-primary">March 2026 / 014</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-16">
        <ServiceSection 
          title="Lunch Service" 
          items={lunchItems} 
          colorClass="bg-primary-container text-on-primary-container"
          accentColor="bg-primary"
          onAddItem={() => {}}
          onRemoveItem={(id) => setLunchItems(prev => prev.filter(i => i.id !== id))}
        />
        
        <ServiceSection 
          title="Dinner Service" 
          items={dinnerItems} 
          colorClass="bg-tertiary-container text-on-tertiary-container"
          accentColor="bg-tertiary"
          onAddItem={() => {}}
          onRemoveItem={(id) => setDinnerItems(prev => prev.filter(i => i.id !== id))}
        />
      </div>

      <div className="mt-8 pt-16 border-t border-outline-variant/10">
        <div className="flex flex-col items-end">
          <span className="text-[12px] uppercase tracking-[0.2em] text-on-surface-variant font-extrabold mb-2">GRAND TOTAL</span>
          <div className="text-[3.5rem] font-black leading-none tracking-tighter text-primary font-headline">
            <span className="text-3xl font-bold align-top mt-2 inline-block">₹</span> {grandTotal.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-12 items-center">
        <button className="w-full max-w-md py-6 pristine-gradient rounded-2xl shadow-[0_20px_40px_rgba(45,51,53,0.1)] text-white font-extrabold text-lg tracking-wider active:scale-[0.98] transition-all hover:shadow-[0_25px_50px_rgba(45,51,53,0.15)] cursor-pointer">
          SAVE BILL DATA
        </button>
        <div className="flex items-center gap-3 py-3 px-6 bg-primary/5 rounded-full border border-primary/10">
          <CheckCircle2 size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">All entries auto-saved to cloud registry</span>
        </div>
      </div>
    </div>
  );

  const renderMonthlyReport = () => (
    <div className="max-w-7xl mx-auto px-6">
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <span className="text-on-surface-variant font-headline text-[10px] uppercase tracking-[0.2em] font-bold">Analytics Dashboard</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline">Monthly Bill Insights</h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-surface-container-high rounded-xl px-4 py-2 gap-3">
            <div className="flex flex-col">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Start Date</label>
              <input className="bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 text-on-surface" type="date" defaultValue="2023-10-01"/>
            </div>
            <div className="h-8 w-[1px] bg-outline-variant/30"></div>
            <div className="flex flex-col">
              <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">End Date</label>
              <input className="bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 text-on-surface" type="date" defaultValue="2023-10-31"/>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95 border border-outline-variant/10 text-primary cursor-pointer">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95 border border-outline-variant/10 text-primary cursor-pointer">
              <Download size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="md:col-span-1 bg-surface-container-lowest p-8 rounded-4xl shadow-[0_20px_40px_rgba(45,51,53,0.04)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Receipt size={96} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-4">Total Monthly Expenditure</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-medium text-primary-dim">₹</span>
              <h2 className="text-6xl font-extrabold tracking-tighter text-on-surface font-headline leading-none">84,250</h2>
            </div>
            <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm">
              <TrendingUp size={16} />
              <span>12% vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-8 rounded-4xl flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-4">Lunch Total</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-medium text-on-surface-variant">₹</span>
              <h3 className="text-4xl font-bold tracking-tight text-on-surface font-headline">38,120</h3>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold tracking-widest uppercase">45 Transactions</span>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-4xl flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-4">Dinner Total</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-medium text-on-surface-variant">₹</span>
              <h3 className="text-4xl font-bold tracking-tight text-on-surface font-headline">46,130</h3>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold tracking-widest uppercase">32 Transactions</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold tracking-tight font-headline">Detailed Bill Ledger</h3>
          <div className="flex gap-4">
            <button className="text-sm font-semibold text-primary flex items-center gap-1 cursor-pointer">
              <Filter size={18} />
              Filter
            </button>
            <button className="text-sm font-semibold text-primary flex items-center gap-1 cursor-pointer">
              <SortAsc size={18} />
              Sort
            </button>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-5xl overflow-hidden shadow-[0_20px_40px_rgba(45,51,53,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Client</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Total (₹)</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-8 py-6 font-semibold text-sm">{t.date}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${t.type === 'LUNCH' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-container text-on-tertiary-container'} flex items-center justify-center font-bold text-xs`}>
                          {t.clientInitials}
                        </div>
                        <span className="font-medium text-sm">{t.client}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-sm">{t.total.toLocaleString()}.00</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full ${t.status === 'PAID' ? 'bg-primary-container/30 text-on-primary-container' : 'bg-error-container/20 text-error'} text-[10px] font-bold tracking-wide`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-primary hover:opacity-70 transition-opacity">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
        <button className="w-full md:w-auto px-10 py-5 rounded-2xl pristine-gradient text-white font-bold tracking-tight text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
          <FileText size={20} />
          DOWNLOAD PDF
        </button>
        <button className="w-full md:w-auto px-10 py-5 rounded-2xl bg-surface-container-lowest border border-primary text-primary font-bold tracking-tight text-lg shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer">
          <Share2 size={20} />
          SHARE REPORT
        </button>
      </section>
    </div>
  );

  const renderHistory = () => (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-16 pt-8">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Export History</h1>
        <p className="text-on-surface-variant font-sans text-sm uppercase tracking-widest">A meticulous archive of your culinary financials</p>
      </header>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            className="w-full pl-12 pr-4 py-3 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/50" 
            placeholder="Search by report name..." 
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            ALL EXPORTS <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="hidden md:grid grid-cols-12 px-8 py-4 text-on-surface-variant font-sans text-[10px] uppercase tracking-widest font-bold">
          <div className="col-span-4">Report Name</div>
          <div className="col-span-2">Export Date</div>
          <div className="col-span-3">Period</div>
          <div className="col-span-2 text-right">File Size</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {exports.map((e, idx) => (
          <div key={e.id} className={`group grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 ${idx % 2 === 0 ? 'bg-surface-container-lowest shadow-[0_20px_40px_rgba(45,51,53,0.03)]' : 'bg-surface-container'} rounded-2xl hover:shadow-[0_20px_40px_rgba(45,51,53,0.08)] transition-all duration-300`}>
            <div className="col-span-4 flex items-center gap-4 mb-4 md:mb-0">
              <div className={`w-12 h-12 rounded-xl ${e.type === 'pdf' ? 'bg-primary-container/30 text-primary' : 'bg-tertiary-container/30 text-tertiary'} flex items-center justify-center`}>
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-on-surface">{e.name}</h3>
                <p className="text-xs text-on-surface-variant md:hidden mt-1">Exported {e.date}</p>
              </div>
            </div>
            <div className="col-span-2 hidden md:block text-sm text-on-surface-variant">{e.date}</div>
            <div className="col-span-3 hidden md:block">
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-lg text-xs font-medium">{e.period}</span>
            </div>
            <div className="col-span-2 text-right hidden md:block font-mono text-sm text-on-surface-variant">{e.size}</div>
            <div className="col-span-1 flex justify-end">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-primary hover:bg-primary hover:text-white transition-all active:scale-90 cursor-pointer">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-primary rounded-3xl text-white shadow-xl flex flex-col justify-between h-48">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Active Storage</span>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold font-headline">12.4</span>
            <span className="text-lg pb-1 opacity-80">MB</span>
          </div>
          <p className="text-xs opacity-70">Used for saved culinary documents</p>
        </div>
        <div className="p-8 bg-surface-container-lowest rounded-3xl shadow-[0_20px_40px_rgba(45,51,53,0.06)] h-48 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Export Volume</span>
          <div className="text-4xl font-extrabold font-headline text-on-surface">24</div>
          <p className="text-xs text-on-surface-variant">Reports generated this month</p>
        </div>
        <div className="p-8 bg-surface-container-high rounded-3xl h-48 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Quick Insight</span>
          <div className="text-xl font-bold text-on-surface leading-tight">Your reports are stored for 180 days.</div>
          <button className="text-primary text-xs font-bold flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
            LEARN MORE <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="fixed bottom-24 right-6 md:bottom-12 md:right-12">
        <button className="bg-primary hover:shadow-lg transition-all active:scale-95 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(0,109,79,0.2)] group cursor-pointer">
          <Settings size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === 'new-bill' && renderNewBill()}
      {currentPage === 'monthly-report' && renderMonthlyReport()}
      {currentPage === 'history' && renderHistory()}
    </Layout>
  );
}
