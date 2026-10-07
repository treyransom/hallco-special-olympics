import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-red">404</p>
      <h1 className="mt-3 text-5xl font-extrabold uppercase text-ink sm:text-7xl">Out of bounds.</h1>
      <p className="mt-4 max-w-md text-ink-soft">That page doesn't exist. Let's get you back in the game.</p>
      <Button href="/" variant="secondary" className="mt-8">Back home</Button>
    </section>
  );
}
