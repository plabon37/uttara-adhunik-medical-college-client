import Hero from "@/components/home/Hore";
import Notice from "@/components/home/Notice";
import Publication from "@/components/home/Publication";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <Notice />

            <Publication />
          </div>
        </div>
      </section>
    </main>
  );
}