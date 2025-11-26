"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Venture {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  status: "live" | "building" | "soon";
  color: string;
  icon: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: "live" | "building" | "idea";
}

const ventures: Venture[] = [
  {
    id: "v1",
    name: "VentureLoop",
    tagline: "Deal flow, AI-assisted",
    description: "Pipeline de inversión asistido por AI agents. Para VCs y Founders que quieren cerrar más deals sin perderse en planillas.",
    url: "https://ventureloop.io",
    status: "live",
    color: "#80CBCB",
    icon: "◈",
  },
  {
    id: "v2",
    name: "Kalia",
    tagline: "WhatsApp conversations engine",
    description: "Motor de conversaciones por WhatsApp ultra específico. Venta, seguimiento y personalización en cada mensaje.",
    url: "https://kalia.ai",
    status: "live",
    color: "#9B59B6",
    icon: "◉",
  },
  {
    id: "v3",
    name: "UniExpress",
    tagline: "Supermercado de barrio, AI-powered",
    description: "Un supermercado de barrio con un core de AI en su operación. Optimización de stock, precios y experiencia de compra.",
    url: "https://uniexpress.com.ar",
    status: "live",
    color: "#27AE60",
    icon: "◇",
  },
  {
    id: "v4",
    name: "MendoSAS",
    tagline: "Tu SAS en Mendoza, simple",
    description: "Creá tu Sociedad por Acciones Simplificada en Mendoza. Seguimiento de facturación y presentaciones en tiempo y forma.",
    url: "https://mendosas.com",
    status: "building",
    color: "#E74C3C",
    icon: "◆",
  },
  {
    id: "v5",
    name: "Muni",
    tagline: "AI community manager",
    description: "Tu community manager con IA. Crea piezas de contenido y publica automáticamente en todas tus redes.",
    url: "https://muni.social",
    status: "building",
    color: "#F39C12",
    icon: "◎",
  },
];

const projects: Project[] = [
  {
    id: "1",
    name: "api-thing",
    description: "wrapper minimalista para apis rest. menos código, más café.",
    url: "https://github.com/t0t0/api-thing",
    status: "live",
  },
  {
    id: "2",
    name: "pixel-sorter",
    description: "ordena pixeles de imágenes por brillo. arte glitch on demand.",
    url: "https://github.com/t0t0/pixel-sorter",
    status: "live",
  },
  {
    id: "3",
    name: "cmd-notes",
    description: "notas desde la terminal. sin distracciones, solo texto.",
    url: "https://github.com/t0t0/cmd-notes",
    status: "building",
  },
];

const statusStyles = {
  live: "text-[#222]",
  building: "text-[#FF6D1F]",
  idea: "text-[#888]",
  soon: "text-[#888]",
};

const statusLabels = {
  live: "● live",
  building: "◐ building",
  idea: "○ idea",
  soon: "○ soon",
};

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF6D1F] text-xl">{">"}</span>
            <h1 className="text-2xl font-bold text-[#222] tracking-tight">
              t0t0
            </h1>
            <span className="cursor-blink text-[#FF6D1F]">_</span>
          </div>
          <p className="text-sm text-[#666] font-mono leading-relaxed">
            product builder. haciendo cosas que a veces funcionan.
            <br />
            <span className="text-[#999]">// building products, shipping companies</span>
          </p>
        </header>

        {/* Ventures Section */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs text-[#FF6D1F] uppercase tracking-wider font-bold">
              ./ventures
            </span>
            <div className="flex-1 h-px bg-[#FF6D1F]/30" />
          </div>

          <div className="grid gap-4">
            {ventures.map((venture) => (
              <a
                key={venture.id}
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredVenture(venture.id)}
                onMouseLeave={() => setHoveredVenture(null)}
              >
                <Card
                  className={`
                    bg-[#222] border-[#333] 
                    hover:border-[${venture.color}]/50
                    transition-all duration-300 cursor-pointer
                    py-5 px-6 group overflow-hidden relative
                  `}
                  style={{
                    borderColor: hoveredVenture === venture.id ? `${venture.color}50` : '#333',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${venture.color}15, transparent 70%)`,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-2xl"
                          style={{ color: venture.color }}
                        >
                          {venture.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-[#FAF3E1] text-lg group-hover:text-white transition-colors">
                            {venture.name}
                          </h3>
                          <p className="text-xs text-[#888] group-hover:text-[#aaa] transition-colors">
                            {venture.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span 
                          className="text-xs font-mono px-2 py-1 rounded"
                          style={{ 
                            color: venture.status === 'live' ? venture.color : '#888',
                            backgroundColor: venture.status === 'live' ? `${venture.color}20` : 'transparent',
                          }}
                        >
                          {statusLabels[venture.status]}
                        </span>
                        
                        {/* Arrow indicator */}
                        <span 
                          className={`
                            transition-all duration-300 text-lg
                            ${hoveredVenture === venture.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                          `}
                          style={{ color: venture.color }}
                        >
                          →
                        </span>
                      </div>
                    </div>

                    <p 
                      className={`
                        text-sm text-[#888] leading-relaxed pl-9
                        transition-all duration-300 overflow-hidden
                        ${hoveredVenture === venture.id ? 'max-h-20 opacity-100 mt-0' : 'max-h-0 opacity-0 -mt-3'}
                      `}
                    >
                      {venture.description}
                    </p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Side Projects */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#999] uppercase tracking-wider">
              ./side-projects
            </span>
            <div className="flex-1 h-px bg-[#E5DCC8]" />
          </div>

          <div className="grid gap-3">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card
                  className={`
                    bg-[#F5E7C6]/50 border-[#E5DCC8] 
                    hover:bg-[#F5E7C6] hover:border-[#FF6D1F]/30
                    transition-all duration-200 cursor-pointer
                    py-4 px-5 group
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[#888] text-sm group-hover:text-[#FF6D1F] transition-colors">
                          ~/
                        </span>
                        <h3 className="font-medium text-[#222] group-hover:text-[#222]">
                          {project.name}
                        </h3>
                      </div>

                      {hoveredId === project.id && (
                        <p className="mt-2 text-sm text-[#666] card-description ml-7">
                          {project.description}
                        </p>
                      )}
                    </div>

                    <span className={`text-xs font-mono ${statusStyles[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E5DCC8]">
          <div className="flex items-center justify-between text-xs text-[#999]">
            <span>$ echo &quot;construyendo&quot;</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/t0t0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                github
              </a>
              <a
                href="https://twitter.com/t0t0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                twitter
              </a>
              <a
                href="mailto:hola@t0t0.dev"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                mail
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
