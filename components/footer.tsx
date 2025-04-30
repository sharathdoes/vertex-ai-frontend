import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              <span className="text-[#8c74f0]">Vertex</span> AI
            </Link>
            <p className="text-white/60 mb-6 max-w-md">
              Redefining search through graph intelligence. Transform natural language into powerful graph queries for
              more contextual results.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/sharathdoes/Luma-AI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8c74f0] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8c74f0] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sharath-chandra-gaddam-851a45263/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8c74f0] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "How It Works", "Knowledge Graph", "Cypher Queries"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/60 hover:text-[#8c74f0] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://neo4j.com/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#8c74f0] transition-colors"
                >
                  Neo4j Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://db-engines.com/en/ranking/graph+dbms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#8c74f0] transition-colors"
                >
                  Graph Database Overview
                </a>
              </li>
              <li>
                <a
                  href="https://arxiv.org/search/cs?searchtype=author&query=knowledge+graph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#8c74f0] transition-colors"
                >
                  Knowledge Graph Papers (arXiv)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sharathdoes/Luma-AI/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#8c74f0] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Vertex AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
