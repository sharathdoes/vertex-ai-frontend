"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code } from "@/components/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Code2, Database, ArrowRight, ChevronRight } from "lucide-react"

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Natural Language Input",
      description: "Enter your query in plain English, just as you would ask a question to a person.",
      icon: <MessageSquare className="h-8 w-8 text-[#8c74f0]" />,
      code: `"Find all sci-fi movies released after 2010 with a rating above 8.0"`,
    },
    {
      title: "Conversion to Cypher",
      description:
        "Vertex AI analyzes your query and transforms it into a structured Cypher query for graph databases.",
      icon: <Code2 className="h-8 w-8 text-[#8c74f0]" />,
      code: `MATCH (m:Movie)-[:IN_GENRE]->(:Genre {name: "Sci-Fi"})
WHERE m.releaseYear > 2010 AND m.rating > 8.0
RETURN m.title, m.releaseYear, m.rating
ORDER BY m.rating DESC`,
    },
    {
      title: "Graph Database Execution",
      description:
        "The Cypher query is executed against a knowledge graph, finding connections and relationships between entities.",
      icon: <Database className="h-8 w-8 text-[#8c74f0]" />,
      code: `{
  "results": [
    { "title": "Interstellar", "releaseYear": 2014, "rating": 8.6 },
    { "title": "Inception", "releaseYear": 2010, "rating": 8.8 },
    { "title": "Blade Runner 2049", "releaseYear": 2017, "rating": 8.1 }
  ]
}`,
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-zinc-950 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-[#8c74f0]">Vertex</span> Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Transforming natural language into powerful graph queries for more intelligent search results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-zinc-900 p-6 rounded-xl border ${
                activeStep === index ? "border-[#8c74f0]" : "border-zinc-800"
              } cursor-pointer hover:border-[#8c74f0]/70 transition-all`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-zinc-800 rounded-lg">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-white/70 mb-4">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-end">
                  <ArrowRight className="text-[#8c74f0] h-5 w-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <Tabs defaultValue="code" className="w-full">
            <TabsList  className=" mb-4 rounded-xl">
              <TabsTrigger value="code" >Code</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-0">
              <Code className="text-sm md:text-base p-4 bg-zinc-950 rounded-lg overflow-x-auto">
                {steps[activeStep].code}
              </Code>
            </TabsContent>
            <TabsContent value="visual" className="mt-0">
              <div className="bg-zinc-950 rounded-lg p-6 h-64 flex items-center justify-center">
                <p className="text-white/60 text-center">
                  Interactive visualization would appear here, showing the transformation process for step{" "}
                  {activeStep + 1}: {steps[activeStep].title}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={activeStep === 0}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeStep === 0 ? "text-white/30 cursor-not-allowed" : "text-white hover:bg-zinc-800"
              }`}
            >
              <ChevronRight className="h-5 w-5 transform rotate-180 mr-2" />
              Previous
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
              disabled={activeStep === steps.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeStep === steps.length - 1 ? "text-white/30 cursor-not-allowed" : "text-white hover:bg-zinc-800"
              }`}
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
