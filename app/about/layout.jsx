import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <main className="">
        <section className="w-full">
          {children}
        </section>
      </main>

    </>
  )
}