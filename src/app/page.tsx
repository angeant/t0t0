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

interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "building" | "soon";
  color: string;
  icon: string;
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

const agents: Agent[] = [
  {
    id: "a1",
    name: "TurnosMed",
    tagline: "Gestión de turnos para profesionales",
    description: "Agent para management de turnos de médicos y otros profesionales. Agenda, confirma, reprograma y hace seguimiento automático.",
    status: "live",
    color: "#3498DB",
    icon: "⬡",
  },
  {
    id: "a2",
    name: "SalesAgent",
    tagline: "Tu vendedor que nunca duerme",
    description: "Agent de ventas que califica leads, hace seguimiento y cierra oportunidades. Integrado con tu CRM y canales de comunicación.",
    status: "building",
    color: "#E91E63",
    icon: "⬢",
  },
];

const statusLabels = {
  live: "● live",
  building: "◐ building",
  soon: "○ soon",
};

export default function Home() {
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF6D1F] text-xl">{">"}</span>
            <h1 className="text-2xl font-bold text-[#222] tracking-tight">
              t0t0 + ulish
            </h1>
            <span className="cursor-blink text-[#FF6D1F]">_</span>
          </div>
          <p className="text-sm text-[#666] font-mono leading-relaxed">
            Soy t0t0 y junto a Ulish, amamos construir productos digitales.
            <br />
            <span className="text-[#999]">// building products, shipping companies</span>
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://twitter.com/t0t0_btc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#888] hover:text-[#FF6D1F] transition-colors"
            >
              @t0t0_btc
            </a>
            <a
              href="https://twitter.com/uguareschi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#888] hover:text-[#FF6D1F] transition-colors"
            >
              @uguareschi
            </a>
          </div>
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

        {/* Agents Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs text-[#FF6D1F] uppercase tracking-wider font-bold">
              ./agents
            </span>
            <div className="flex-1 h-px bg-[#FF6D1F]/30" />
          </div>

          <div className="grid gap-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <Card
                  className={`
                    bg-[#F5E7C6]/80 border-[#E5DCC8] 
                    transition-all duration-300
                    py-5 px-6 group overflow-hidden relative
                  `}
                  style={{
                    borderColor: hoveredAgent === agent.id ? `${agent.color}50` : '#E5DCC8',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top right, ${agent.color}10, transparent 70%)`,
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-2xl"
                          style={{ color: agent.color }}
                        >
                          {agent.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-[#222] text-lg group-hover:text-[#111] transition-colors">
                            {agent.name}
                          </h3>
                          <p className="text-xs text-[#888] group-hover:text-[#666] transition-colors">
                            {agent.tagline}
                          </p>
                        </div>
                      </div>

                      <span 
                        className="text-xs font-mono px-2 py-1 rounded"
                        style={{ 
                          color: agent.status === 'live' ? agent.color : '#888',
                          backgroundColor: agent.status === 'live' ? `${agent.color}20` : 'transparent',
                        }}
                      >
                        {statusLabels[agent.status]}
                      </span>
                    </div>

                    <p 
                      className={`
                        text-sm text-[#666] leading-relaxed pl-9
                        transition-all duration-300 overflow-hidden
                        ${hoveredAgent === agent.id ? 'max-h-20 opacity-100 mt-0' : 'max-h-0 opacity-0 -mt-3'}
                      `}
                    >
                      {agent.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#E5DCC8]">
          <div className="flex items-center justify-between text-xs text-[#999]">
            <span>$ echo &quot;construyendo&quot;</span>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/t0t0_btc"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                @t0t0_btc
              </a>
              <a
                href="https://twitter.com/uguareschi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6D1F] transition-colors"
              >
                @uguareschi
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
