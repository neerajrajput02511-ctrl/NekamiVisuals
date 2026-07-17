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
  { label: 'Email',     href: 'mailto:neeraj@nekamivisuals.com', icon: Mail },
  { label: 'Instagram', href: 'https://instagram.com/nekamivisuals', icon: Instagram },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/neerajsingh', icon: Linkedin },
  { label: 'YouTube',   href: 'https://youtube.com/@nekamivisuals', icon: Youtube },
  { label: 'Behance',   href: 'https://behance.net/nekamivisuals', icon: ExternalLink },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-bg" role="contentinfo">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              NekamiVisuals
            </div>
            <p className="text-sm text-text-3 max-w-[220px] leading-relaxed">
              Cinematic video editing, professional voice artistry and impactful graphic design.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-5">Pages</p>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-3 hover:text-text-2 transition-colors duration-250"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label mb-5">Connect</p>
            <ul className="space-y-3">
              {socialLinks.map(social => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 text-sm text-text-3 hover:text-text-2 transition-colors duration-250"
                    data-cursor="open"
                  >
                    <social.icon size={14} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-3">© 2026 Neeraj Singh · NekamiVisuals</p>
          <p className="text-xs text-text-3">Made with passion by Neeraj Singh.</p>
        </div>
      </div>
    </footer>
  );
}
