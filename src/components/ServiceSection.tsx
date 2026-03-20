import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { BillItem } from '../types';

interface ServiceSectionProps {
  title: string;
  items: BillItem[];
  colorClass: string;
  accentColor: string;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  items,
  colorClass,
  accentColor,
  onAddItem,
  onRemoveItem,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-8 ${accentColor} rounded-full`}></div>
          <h2 className="text-2xl font-bold tracking-tight font-headline">{title}</h2>
        </div>
        <button 
          onClick={onAddItem}
          className={`flex items-center gap-2 px-4 py-2 ${colorClass} rounded-xl font-bold text-sm active:scale-95 transition-transform cursor-pointer`}
        >
          <Plus size={16} />
          Add {title.split(' ')[0]} Item
        </button>
      </div>
      <div className="bg-surface-container-low rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-white/40">
                <th className="px-8 py-5">Ingredient / Service</th>
                <th className="px-6 py-5">Quantity</th>
                <th className="px-6 py-5">Unit Price</th>
                <th className="px-8 py-5 text-right">Line Total</th>
                <th className="px-4 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-surface-container-high transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-on-surface-variant">{item.description}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-secondary-container px-3 py-1 rounded-full text-xs font-semibold text-on-secondary-container">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-sm">₹ {item.unitPrice.toLocaleString()}</td>
                  <td className={`px-8 py-5 text-right font-bold ${title.includes('Lunch') ? 'text-primary' : 'text-tertiary'}`}>
                    ₹ {item.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-on-surface-variant italic">
                    No items added to this service yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
