"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setError("")
    setShowResults(true)
    
    try {
      const response = await fetch("https://luma-ai-yo1k.onrender.com/api/cypher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),
      })
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(data)
      
      const resultText = data.result || ""
      
      // Extract titles from the result
      const movieData = resultText.match(/\| ([^|]+) \| https?:\/\//g)?.map((match: string) => match.split('|')[1].trim()) || [];
      
      setResults(movieData)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to fetch results. Please try again.")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }
  
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Redefining Search Through <span className="text-[#8c74f0]">Graph Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto">
           Transforms natural language into powerful graph queries, delivering contextual results that
          understand relationships, not just keywords. 
        </p>

        <div className="relative max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Find movies directed by Christopher Nolan where Leonardo DiCaprio starred"
              className="w-full py-6 px-6 bg-zinc-900/70 border-[#8c74f0]/30 text-white rounded-xl focus:ring-[#8c74f0] focus:border-[#8c74f0] text-lg"
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#8c74f0] hover:bg-[#7c64e0] text-white rounded-xl px-4 py-2 flex items-center"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span className="hidden md:inline">Search</span>
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </div>
        </div>

        {showResults ? (
          <div className="w-full max-w-6xl mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={32} className="animate-spin text-[#8c74f0]" />
                <span className="ml-3 text-lg text-white/80">Searching the knowledge graph...</span>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
                <p className="text-red-200">{error}</p>
                <Button 
                  onClick={() => setShowResults(false)} 
                  className="mt-4 bg-red-500/30 hover:bg-red-500/50 text-white rounded-xl"
                >
                  Try Again
                </Button>
              </div>
            ) : results.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center">Search Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {results.map((movie, index) => (
                    <div key={index} className="bg-zinc-900/70 border border-[#8c74f0]/20 rounded-xl overflow-hidden hover:border-[#8c74f0]/50 transition-all">
                      <div className="h-36 bg-zinc-800 relative"><img
          src="https://i.pinimg.com/736x/2f/eb/6d/2feb6d4752163e689af9c1cec3f00b6d.jpg"
          alt="Movie Poster"
          className="w-full h-full object-cover"
        /></div>
                      <div className="p-4">
                        
                        <h3 className="text-lg font-medium text-white">{movie}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => setShowResults(false)} 
                    variant="outline"
                    className="border-[#8c74f0] text-[#8c74f0] hover:bg-[#8c74f0]/10 rounded-xl"
                  >
                    New Search
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6 text-center">
                <p className="text-yellow-200 mb-2">No results found.</p>
                <p className="text-white/60 mb-4">Try a different search term or refine your query.</p>
                <Button 
                  onClick={() => setShowResults(false)} 
                  className="bg-[#8c74f0]/30 hover:bg-[#8c74f0]/50 text-white rounded-xl"
                >
                  Back to Search
                </Button>
              </div>
            )} 
          </div>
        ) : (
          <>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Vertex converts your natural language prompts into Cypher queries, searching a knowledge graph to find
              connections traditional search engines miss.
            </p>

            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-[#8c74f0] text-[#8c74f0] hover:bg-[#8c74f0]/10 rounded-xl">
                Learn More
              </Button>
              <Button className="bg-[#8c74f0] hover:bg-[#7c64e0] text-white rounded-xl">Get Started</Button>
            </div>
          </>
        )}
      </div>

      {!showResults && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight size={24} className="text-[#8c74f0] transform rotate-90" />
        </div>
      )}
    </section>
  )
}