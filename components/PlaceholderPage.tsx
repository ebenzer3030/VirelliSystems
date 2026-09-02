import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PlaceholderPage({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <>
      <Header />
      <main>
        <section className="container-content py-20 sm:py-28">
          <h1 className="text-3xl tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {copy}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
