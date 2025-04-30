import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import HowItWorks from "@/components/how-it-works"
import KnowledgeGraph from "@/components/knowledge-graph"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <KnowledgeGraph />
      </main>
      <Footer />
    </div>
  )
}
