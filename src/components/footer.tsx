import { Glasses } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
  ];

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Men', href: '#' },
        { name: 'Women', href: '#' },
        { name: 'Collections', href: '#' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact Us', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQ', href: '#' },
        { name: 'Shipping & Returns', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
    },
  ];

  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <Glasses className="h-7 w-7 text-primary" />
              <span className="font-headline text-xl font-semibold">VisioStyle Optics</span>
            </a>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Premium eyewear designed for the modern individual.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} VisioStyle Optics. All rights reserved.</p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
