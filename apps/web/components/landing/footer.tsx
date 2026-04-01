export function Footer() {
  const links = [
    { label: "Docs", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "License", href: "#" },
  ];

  return (
    <footer className="relative border-border/50 border-t py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2025 Orion Kit. Open source under MIT License.
          </p>
          <div className="flex gap-6 text-muted-foreground text-sm">
            {links.map((link) => (
              <a
                className="transition-colors hover:text-foreground"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
