import Collections from "@/components/Home/Collections";
import Feature from "@/components/Home/Feature";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Contact from "@/components/Contact/Contact";


export default function Home() {
  return (
    <main className="overflow-x-hidden pt-16 md:pt-0 pb-24 md:pb-0">
      <Hero />
      <div className="flex flex-col gap-0">
        <Feature />
        <Collections />
        <Services />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
