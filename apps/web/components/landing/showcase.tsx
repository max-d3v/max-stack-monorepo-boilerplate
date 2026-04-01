import Image from "next/image";

export function Showcase() {
  return (
    <section className="relative px-6 py-0">
      <div className="mx-auto max-w-7xl">
        <div className="relative mx-auto max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cyan-500/20 via-violet-600/10 to-transparent pb-4 shadow-lg shadow-violet-500/10">
            <div className="flex items-center gap-2 border-border border-b bg-card/50 px-4 py-3 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4 flex-1 rounded bg-muted/50 px-3 py-1 text-muted-foreground text-xs">
                orion-kit-saas.vercel.app
              </div>
            </div>
            <div className="flex h-full items-center justify-center p-8">
              <div className="relative h-full w-full">
                <Image
                  alt="Dashboard Preview"
                  className="object-contain"
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  src="/assets/undraw_counting-stars_onv6.svg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-18 text-center">
          <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
            A realistic SaaS foundation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Built with modern patterns and best practices. Orion Kit gives you a
            solid foundation with authentication, payments, database, and
            analytics—so you can focus on building your unique features instead
            of reinventing the wheel.
          </p>
        </div>
      </div>
    </section>
  );
}
