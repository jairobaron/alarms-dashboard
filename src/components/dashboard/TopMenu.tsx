import { Menu, RefreshCw, Sun, Bell } from 'lucide-react';

export default function TopMenu() {
  return (
    <div className="bg-[hsl(220,30%,10%)] border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-foreground font-semibold">optimum.O&G</span>
          <span className="text-foreground/80 font-medium">JBN902</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors">
            <RefreshCw className="h-5 w-5" />
          </button>
          <button className="text-foreground hover:text-primary transition-colors">
            <Sun className="h-5 w-5" />
          </button>
          <button className="relative text-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-critical text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
