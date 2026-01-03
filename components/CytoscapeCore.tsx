'use client';

import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
// 1. Importiere den Hook für den App Router
import { useRouter } from 'next/navigation';
import { mapToNode } from '@/lib/cytoscape/mapper';
import { DEFAULT_CHILD_SUBJECT, DEFAULT_SUBJECT } from '@/data/exampleSubjects';

export default function MultiSolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Initialisiere den Router Hook
  const router = useRouter();

  // Layout Konfiguration
  const layoutConfig = {
    name: 'fcose',
    quality: 'default',
    animate: true,
    animationDuration: 400,
    nodeRepulsion: 4500,
    idealEdgeLength: 50,
    componentSpacing: 100,
    gravity: 0.25,
    nodeSeparation: 75,
  } as any;

  useEffect(() => {
    if (!containerRef.current) return;
    cytoscape.use(fcose);

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        // --- SYSTEM 1 ---
        { data: { id: 'sun1', label: 'Sun A', type: 'sun', color: '#FF4136' } },
        { data: { id: 'p1a', type: 'planet', parentId: 'sun1' } },
        { data: { id: 'p1b', type: 'planet', parentId: 'sun1' } },
        { data: { id: 'p1c', type: 'planet', parentId: 'sun1' } },
        { data: { source: 'sun1', target: 'p1a' } },
        { data: { source: 'sun1', target: 'p1b' } },
        { data: { source: 'sun1', target: 'p1c' } },

        // --- SYSTEM 2 ---
        { data: { id: 'sun2', label: 'Sun B', type: 'sun', color: '#FFDC00' } },
        { data: { id: 'p2a', type: 'planet', parentId: 'sun2' } },
        { data: { id: 'p2b', type: 'planet', parentId: 'sun2' } },
        { data: { source: 'sun2', target: 'p2a' } },
        { data: { source: 'sun2', target: 'p2b' } },

        // --- SYSTEM 3 (Mit Link im Child) ---
        {
          data: {
            id: 'sun3', label: 'Sun C', type: 'sun', color: '#0074D9',
            children: [
              { data: { id: 'p3a', type: 'planet', parentId: 'sun3', href: "/" } },
              { data: { id: 'p3b', type: 'planet', parentId: 'sun3' } },
              { data: { id: 'p3c', type: 'planet', parentId: 'sun3' } },
              { data: { id: 'p3d', type: 'planet', parentId: 'sun3' } },
              { data: { id: 'p3e', type: 'planet', parentId: 'sun3' } },
              { data: { source: 'p3e', target: 'p3a' } },
              { data: { source: 'sun3', target: 'p3b' } },
              { data: { source: 'sun3', target: 'p3c' } },
              { data: { source: 'sun3', target: 'p3d' } },
              { data: { source: 'sun3', target: 'p3e' } },
              { data: { source: 'p1a', target: 'p3c' } },
              { data: { source: 'p1b', target: 'p3b' } },
            ]
          }
        },
        mapToNode(DEFAULT_SUBJECT),
        { data: { id: 'center', label: 'Center', type: 'center', color: '#fff' } },
        { data: { source: 'center', target: 'sun1' } },
        { data: { source: 'center', target: 'sun2' } },
        { data: { source: 'center', target: 'sun3' } },
      ].flat(),
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': 10
          }
        },
        {
          selector: '[type = "PARENT"]',
          style: {
            'width': 60,
            'height': 60,
            'background-color': 'data(color)',
            'font-size': 14,
            'font-weight': 'bold',
            'border-width': 2,
            'border-color': '#333'
          }
        },
        {
          selector: '[type = "sun"]',
          style: {
            'width': 60,
            'height': 60,
            'background-color': 'data(color)',
            'font-size': 14,
            'font-weight': 'bold',
            'border-width': 2,
            'border-color': '#333'
          }
        },
        {
          selector: '[type = "CHILD"]',
          style: {
            'width': 45,
            'height': 45,
            'color': "#000000",
            'background-color': '#888'
          }
        },
        {
          selector: 'node[href]',
          style: {
            'border-width': 2,
            'border-color': '#fff',
            'background-color': '#001f3f'
          }
        },
        {
          selector: '[type = "center"]',
          style: {
            'width': 30,
            'height': 30,
            'background-color': '#808080'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': '#eee',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: layoutConfig
    });

    // --- EVENT LISTENER MIT ROUTER ---

    cy.on('tap', 'node', function (e) {
      const node = e.target;
      const data = node.data();

      // 1. Logik: Kinder ausklappen
      if (data.children && data.children.length > 0) {
        cy.add(data.children);
        node.data('children', null); // Daten löschen, damit sie nicht doppelt hinzugefügt werden
        cy.layout(layoutConfig).run();
        return;
      }

      // 2. Logik: Routing
      if (data.href) {
        if (data.href.startsWith('http')) {
          // Externer Link -> Neuer Tab
          window.open(data.href, '_blank');
        } else {
          // Interner Link -> Next.js Router (Soft Navigation)
          console.log("Navigiere intern zu:", data.href);
          router.push(data.href);
        }
      }
    });

    // Cursor Logik
    cy.on('mouseover', 'node', () => {
      if (containerRef.current) containerRef.current.style.cursor = 'pointer';
    });
    cy.on('mouseout', 'node', () => {
      if (containerRef.current) containerRef.current.style.cursor = 'default';
    });

    return () => {
      cy.destroy();
    };
  }, [router]); // <--- Router als Dependency hinzufügen

  return <div ref={containerRef} className='w-screen h-screen' />;
}