import Link from 'next/link';
import { Mail, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

const footerLinks = [
  { label: 'Work',         href: '/work' },
  { label: 'Voice',        href: '/voice' },
  { label: 'Design',       href: '/design' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact',      href: '/contact' },
];

const socialLinks = [
  { label: 'Email',     href: 'mailto:neerajrajput02511@gmail.com', icon: Mail },
  { label: 'Instagram', href: 'https://instagram.com/nekamivisuals', icon: Instagram },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/neerajsingh', icon: Linkedin },
  { label: 'YouTube',   href: 'https://youtube.com/@nekamivisuals', icon: Youtube },
  { label: 'Behance',   href: 'https://behance.net/nekamivisuals', icon: ExternalLink },
];

export function Footer() {
  return (
    <footer className="pt-[4rem] pb-[2rem] border-t border-border" role="contentinfo">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-[0.375rem] font-bold text-[0.9375rem] tracking-[-0.04em]">
            <span className="w-[5px] h-[5px] rounded-full bg-text" />
            NekamiVisuals
          </div>

          <div className="flex items-center gap-8 flex-wrap">
            {footerLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8125rem] text-text-3 hover:text-text-2 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-[0.75rem] text-text-3">© {new Date().getFullYear()} Neeraj Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
