import Collections from "@/components/Home/Collections";
import Feature from "@/components/Home/Feature";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Contact from "@/components/Contact/Contact";


export default function Home() {
  return (
    <main className="">
      <Hero />
      <Feature />
      <Collections />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
