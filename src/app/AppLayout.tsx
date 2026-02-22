import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator, 
  Dumbbell, 
  ClipboardCheck, 
  Library, 
  Settings,
  Plane,
  List
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/decode', icon: Calculator, label: 'Decode' },
  { href: '/drills', icon: Dumbbell, label: 'Drills' },
  { href: '/tests', icon: ClipboardCheck, label: 'Tests' },
  { href: '/glossary', icon: List, label: 'Glossary' },
  { href: '/performance', icon: Plane, label: 'Performance' },
  { href: '/library', icon: Library, label: 'Library' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Plane size={28} />
          <span>LPPR Prep</span>
        </div>
        
        <nav>
          <div className="nav-section">
            <div className="nav-section-title">Main</div>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Quick Links</div>
            <Link href="/library?doc=eaip" className="nav-link">
              <BookOpen size={20} />
              <span>eAIP Portugal</span>
            </Link>
            <Link href="https://www.ipma.pt/pt/aviation/" target="_blank" className="nav-link">
              <Library size={20} />
              <span>IPMA Weather</span>
            </Link>
          </div>
        </nav>
      </aside>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
