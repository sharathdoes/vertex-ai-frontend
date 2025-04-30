"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react"

interface Node {
  id: string
  group: number
  label: string
}

interface Link {
  source: string
  target: string
  value: number
  label: string
}

export default function KnowledgeGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [zoom, setZoom] = useState(100)

  // Sample data for the knowledge graph
  const graphData = {
    nodes: [
      { id: "1", group: 1, label: "Inception" },
      { id: "2", group: 1, label: "Interstellar" },
      { id: "3", group: 2, label: "Christopher Nolan" },
      { id: "4", group: 3, label: "Leonardo DiCaprio" },
      { id: "5", group: 3, label: "Matthew McConaughey" },
      { id: "6", group: 4, label: "Sci-Fi" },
      { id: "7", group: 4, label: "Thriller" },
      { id: "8", group: 1, label: "The Dark Knight" },
      { id: "9", group: 3, label: "Christian Bale" },
      { id: "10", group: 1, label: "Dunkirk" },
      { id: "11", group: 3, label: "Tom Hardy" },
      { id: "12", group: 4, label: "War" },
    ],
    links: [
      { source: "1", target: "3", value: 1, label: "DIRECTED_BY" },
      { source: "1", target: "4", value: 1, label: "STARS" },
      { source: "1", target: "6", value: 1, label: "GENRE" },
      { source: "1", target: "7", value: 1, label: "GENRE" },
      { source: "2", target: "3", value: 1, label: "DIRECTED_BY" },
      { source: "2", target: "5", value: 1, label: "STARS" },
      { source: "2", target: "6", value: 1, label: "GENRE" },
      { source: "8", target: "3", value: 1, label: "DIRECTED_BY" },
      { source: "8", target: "9", value: 1, label: "STARS" },
      { source: "8", target: "11", value: 1, label: "STARS" },
      { source: "10", target: "3", value: 1, label: "DIRECTED_BY" },
      { source: "10", target: "11", value: 1, label: "STARS" },
      { source: "10", target: "12", value: 1, label: "GENRE" },
    ],
  }

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Create a simulation with forces
    const simulation = d3
      .forceSimulation(graphData.nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d: any) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))

    // Create the SVG container
    const svg = d3.select(svgRef.current)

    // Add zoom functionality
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })

    svg.call(zoomBehavior as any)

    const g = svg.append("g")

    // Define node colors based on group
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Create links
    const link = g
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.value))

    // Create link labels
    const linkText = g
      .append("g")
      .selectAll("text")
      .data(graphData.links)
      .enter()
      .append("text")
      .text((d: any) => d.label)
      .attr("font-size", "8px")
      .attr("fill", "#aaa")
      .attr("text-anchor", "middle")

    // Create nodes
    const node = g
      .append("g")
      .selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d: any) => {
        switch (d.group) {
          case 1:
            return "#8c74f0" // Movies - purple
          case 2:
            return "#f07474" // Directors - red
          case 3:
            return "#74f0a0" // Actors - green
          case 4:
            return "#f0c674" // Genres - yellow
          default:
            return "#ccc"
        }
      })
      .call(d3.drag<SVGCircleElement, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add node labels
    const nodeText = g
      .append("g")
      .selectAll("text")
      .data(graphData.nodes)
      .enter()
      .append("text")
      .text((d: any) => d.label)
      .attr("font-size", "10px")
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "white")

    // Add titles for nodes (tooltips)
    node.append("title").text((d: any) => d.label)

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      linkText.attr("x", (d: any) => (d.source.x + d.target.x) / 2).attr("y", (d: any) => (d.source.y + d.target.y) / 2)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      nodeText.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Apply initial zoom level
    svg.call(zoomBehavior.transform as any, d3.zoomIdentity.scale(zoom / 100))

    return () => {
      simulation.stop()
    }
  }, [zoom])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 400))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25))
  }

  const handleReset = () => {
    setZoom(100)
  }

  return (
    <section id="knowledge-graph" className="py-20 bg-black min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Knowledge Graph <span className="text-[#8c74f0]">Visualization</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore the interconnected web of entities and relationships that power Vertex's contextual understanding.
          </p>
        </div>

        <div className="bg-zinc-950 rounded-xl p-4 md:p-6 border border-zinc-800 mb-8">
          <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomIn} className="border-zinc-700 hover:bg-zinc-800">
                <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut} className="border-zinc-700 hover:bg-zinc-800">
                <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="border-zinc-700 hover:bg-zinc-800">
                <RefreshCw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/3">
              <span className="text-xs text-white/60">Zoom:</span>
              <Slider
                value={[zoom]}
                min={25}
                max={400}
                step={5}
                onValueChange={(value) => setZoom(value[0])}
                className="flex-1"
              />
              <span className="text-xs text-white/60 w-10 text-right">{zoom}%</span>
            </div>
          </div>

          <div className="h-[500px] w-full bg-zinc-900/50 rounded-lg overflow-hidden">
            <svg ref={svgRef} width="100%" height="100%" className="cursor-move"></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { color: "#8c74f0", label: "Movies" },
            { color: "#f07474", label: "Directors" },
            { color: "#74f0a0", label: "Actors" },
            { color: "#f0c674", label: "Genres" },
          ].map((item, index) => (
            <div key={index} className="flex items-center bg-zinc-900 p-3 rounded-lg">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-white/80">{item.label}</span>
            </div>
          ))}
        </div>
{/* 
        <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-xl font-semibold mb-4">Why Knowledge Graphs Matter</h3>
          <p className="text-white/70 mb-4">
            Unlike traditional search engines that rely on keyword matching, knowledge graphs capture the relationships
            between entities. This allows Vertex to understand context, infer connections, and deliver more relevant
            results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Contextual Understanding",
                description:
                  "Grasp the meaning behind your queries by understanding how entities relate to each other.",
              },
              {
                title: "Relationship Discovery",
                description: "Uncover hidden connections between people, places, concepts, and more.",
              },
              {
                title: "Semantic Search",
                description: "Find what you're looking for based on meaning, not just keyword matching.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <h4 className="text-lg font-medium mb-2 text-[#8c74f0]">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
