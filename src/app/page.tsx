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
}

interface Agent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "building" | "soon";
}

const ventures: Venture[] = [
  {
    id: "v1",
    name: "VentureLoop",
    tagline: "Deal flow, AI-assisted",
    description: "Pipeline de inversión asistido por AI agents. Para VCs y Founders que quieren cerrar más deals sin perderse en planillas.",
    url: "https://ventureloop.io",
    status: "live",
  },
  {
    id: "v2",
    name: "Kalia",
    tagline: "Motor conversacional de AI por WhatsApp",
    description: "Motor conversacional de AI aplicado a tareas de seguimiento, carga de datos, análisis y reportes.",
    url: "https://kalia.ai",
    status: "live",
  },
  {
    id: "v3",
    name: "UniExpress",
    tagline: "Supermercado de barrio, AI-powered",
    description: "Un supermercado de barrio con un core de AI en su operación. Optimización de stock, precios y experiencia de compra.",
    url: "https://uniexpress.com.ar",
    status: "live",
  },
  {
    id: "v4",
    name: "MendoSAS",
    tagline: "Tu SAS en Mendoza, simple",
    description: "Creá tu Sociedad por Acciones Simplificada en Mendoza. Seguimiento de facturación y presentaciones en tiempo y forma.",
    url: "https://mendosas.com",
    status: "building",
  },
  {
    id: "v5",
    name: "Muni",
    tagline: "AI community manager",
    description: "Tu community manager con IA. Crea piezas de contenido y publica automáticamente en todas tus redes.",
    url: "https://muni.social",
    status: "building",
  },
];

const agents: Agent[] = [
  {
    id: "a1",
    name: "TurnosMed",
    tagline: "Gestión de turnos para profesionales",
    description: "Agent para management de turnos de médicos y otros profesionales. Agenda, confirma, reprograma y hace seguimiento automático.",
    status: "live",
  },
  {
    id: "a2",
    name: "SalesAgent",
    tagline: "Tu vendedor que nunca duerme",
    description: "Agent de ventas que califica leads, hace seguimiento y cierra oportunidades. Integrado con tu CRM y canales de comunicación.",
    status: "building",
  },
  {
    id: "a3",
    name: "Logralo",
    tagline: "Elegí un objetivo, poné un plazo",
    description: "Agent que te acompaña hasta lograr tu objetivo. Ojo: no cumplir no es gratis $$.",
    status: "building",
  },
  {
    id: "a4",
    name: "Facturita",
    tagline: "Facturación AFIP sin vueltas",
    description: "Agent que te pide tus datos de AFIP y te emite facturas con los detalles que vos le des. Simple y rápido.",
    status: "building",
  },
];

const statusLabels = {
  live: "● live",
  building: "○ building",
  soon: "○ soon",
};

export default function Home() {
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF3E1] relative scanlines noise">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#FF6D1F] text-xl">{">"}</span>
            <h1 className="text-2xl font-bold text-[#222] tracking-tight">
              t0t0 + Ulish
            </h1>
            <span className="cursor-blink text-[#FF6D1F]">_</span>
          </div>
          <p className="text-sm text-[#666] font-mono leading-relaxed">
            Hola! Soy t0t0, y junto a Ulish, amamos construir productos digitales utilizando IA.
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
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#999] uppercase tracking-wider">
              ./ventures
            </span>
            <div className="flex-1 h-px bg-[#E5DCC8]" />
          </div>

          <div className="grid gap-2">
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
                    bg-[#F5E7C6]/50 border-[#E5DCC8] 
                    hover:bg-[#F5E7C6] hover:border-[#D5CCA8]
                    transition-all duration-200 cursor-pointer
                    py-3 px-4 group
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#999] text-sm group-hover:text-[#FF6D1F] transition-colors">
                          ~/
                        </span>
                        <h3 className="font-medium text-[#222]">
                          {venture.name}
                        </h3>
                        <span className="text-[#999] text-xs">
                          — {venture.tagline}
                        </span>
                      </div>

                      {hoveredVenture === venture.id && (
                        <p className="mt-2 text-sm text-[#666] card-description ml-5">
                          {venture.description}
                        </p>
                      )}
                    </div>

                    <span className={`text-xs font-mono ${venture.status === 'live' ? 'text-[#222]' : 'text-[#999]'}`}>
                      {statusLabels[venture.status]}
                    </span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Agents Section */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-[#999] uppercase tracking-wider">
              ./agents
            </span>
            <div className="flex-1 h-px bg-[#E5DCC8]" />
          </div>

          <div className="grid gap-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <Card
                  className={`
                    bg-[#F5E7C6]/50 border-[#E5DCC8] 
                    hover:bg-[#F5E7C6] hover:border-[#D5CCA8]
                    transition-all duration-200
                    py-3 px-4 group
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#999] text-sm group-hover:text-[#FF6D1F] transition-colors">
                          λ
                        </span>
                        <h3 className="font-medium text-[#222]">
                          {agent.name}
                        </h3>
                        <span className="text-[#999] text-xs">
                          — {agent.tagline}
                        </span>
                      </div>

                      {hoveredAgent === agent.id && (
                        <p className="mt-2 text-sm text-[#666] card-description ml-4">
                          {agent.description}
                        </p>
                      )}
                    </div>

                    <span className={`text-xs font-mono ${agent.status === 'live' ? 'text-[#222]' : 'text-[#999]'}`}>
                      {statusLabels[agent.status]}
                    </span>
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
