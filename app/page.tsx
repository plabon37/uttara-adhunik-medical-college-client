import Hero from "@/components/home/Hore";
import Notice from "@/components/home/Notice";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}

      <Hero />

      {/* Notice Board */}

      <Notice />
    </main>
  );
}