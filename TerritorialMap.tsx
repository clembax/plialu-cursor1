import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TerritorialMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 500;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Simplified GeoJSON for France, Switzerland, Belgium
    // Using a basic projection centered on France
    const projection = d3.geoMercator()
      .center([3.5, 47.5])
      .scale(2000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Fetching GeoJSON from a reliable source (Natural Earth simplified)
    // For the sake of this task and to ensure it works, I will use a small subset of features
    // or fetch it. Since I cannot easily fetch and I want it to be "real", 
    // I'll use a simplified GeoJSON structure.
    
    const geoDataUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

    d3.json(geoDataUrl).then((data: any) => {
      const countries = data.features.filter((d: any) => 
        ["France", "Switzerland", "Belgium"].includes(d.properties.name)
      ).map((d: any) => {
        // For France, try to keep only the largest polygon (Metropolitan France)
        // to avoid artifacts from overseas territories
        if (d.properties.name === "France" && d.geometry.type === "MultiPolygon") {
          const mainPolygon = d.geometry.coordinates.reduce((prev: any, curr: any) => {
            return curr[0].length > prev[0].length ? curr : prev;
          }, d.geometry.coordinates[0]);
          return {
            ...d,
            geometry: {
              type: "Polygon",
              coordinates: mainPolygon
            }
          };
        }
        return d;
      });

      // Draw countries
      svg.append("g")
        .selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d: any) => d.properties.name === "France" ? "#0E2A33" : "#0E2A33")
        .attr("fill-opacity", (d: any) => d.properties.name === "France" ? 1 : 0.6)
        .attr("stroke", "#E2FD48")
        .attr("stroke-width", 0.5)
        .attr("class", (d: any) => `country-${d.properties.name.toLowerCase()}`);

      // Remove potential artifacts (small islands/territories) by checking path area if possible
      // or just selecting the main ones. Since we can't easily recalculate, 
      // we'll try to hide very small paths in the bottom right area if they exist.
      svg.selectAll(".country-france").filter(function(d: any) {
        // This is a bit hacky but if it's a multi-polygon, we might want to hide small parts
        // However, d3 path doesn't easily give us sub-polygons here without re-processing.
        return false; 
      });


      // Intervention Zones (Lime green, low opacity)
      const zones = [
        {
          name: "Rhône-Alpes",
          coords: [[4.5, 46.2], [5.5, 46.3], [6.5, 46.0], [7.0, 45.5], [6.8, 44.8], [5.8, 44.5], [4.8, 44.6], [4.2, 45.2]],
          opacity: 0.1
        },
        {
          name: "Île-de-France",
          coords: [[2.0, 49.0], [2.7, 49.1], [3.0, 48.8], [2.8, 48.5], [2.1, 48.4], [1.8, 48.7]],
          opacity: 0.08
        },
        {
          name: "Sud",
          coords: [[4.5, 43.8], [5.5, 43.9], [6.0, 43.5], [5.8, 43.1], [4.8, 43.0], [4.3, 43.3]],
          opacity: 0.08
        }
      ];

      const lineGenerator = d3.line()
        .x((d: any) => projection(d as [number, number])![0])
        .y((d: any) => projection(d as [number, number])![1])
        .curve(d3.curveBasisClosed);

      zones.forEach(zone => {
        svg.append("path")
          .attr("d", lineGenerator(zone.coords as any))
          .attr("fill", "#E2FD48")
          .attr("fill-opacity", zone.opacity)
          .attr("stroke", "none");
      });

      // Lyon Point
      const lyonCoords: [number, number] = [4.8357, 45.7640];
      const [lyonX, lyonY] = projection(lyonCoords) || [0, 0];

      // Paris Point
      const parisCoords: [number, number] = [2.3522, 48.8566];
      const [parisX, parisY] = projection(parisCoords) || [0, 0];

      // Arrows from Lyon
      const arrowTargets: [number, number][] = [
        [8.2, 46.8], // Switzerland
        [2.35, 48.85], // IDF/Paris
        [5.3, 43.3] // South
      ];

      // Arrow marker definition
      svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", "8")
        .attr("refY", "5")
        .attr("markerWidth", "3.5")
        .attr("markerHeight", "3.5")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("fill", "#E2FD48")
        .attr("fill-opacity", 0.5);

      arrowTargets.forEach(target => {
        const [tx, ty] = projection(target) || [0, 0];
        
        // Calculate point slightly away from target to not overlap with labels or points
        const dx = tx - lyonX;
        const dy = ty - lyonY;
        const endX = lyonX + dx * 0.82;
        const endY = lyonY + dy * 0.82;

        svg.append("line")
          .attr("x1", lyonX)
          .attr("y1", lyonY)
          .attr("x2", endX)
          .attr("y2", endY)
          .attr("stroke", "#E2FD48")
          .attr("stroke-width", 0.5)
          .attr("stroke-opacity", 0.4)
          .attr("marker-end", "url(#arrowhead)");
      });

      // Points
      [lyonCoords, parisCoords].forEach(coords => {
        const [px, py] = projection(coords) || [0, 0];
        svg.append("circle")
          .attr("cx", px)
          .attr("cy", py)
          .attr("r", 3.5)
          .attr("fill", "#E2FD48");
      });

      // Helper function for legible text
      const addLegibleText = (x: number, y: number, text: string, fontSize: string, fontWeight: string, anchor: string = "start", opacity: number = 1) => {
        const g = svg.append("g").attr("opacity", opacity);
        
        // Halo for legibility
        g.append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", anchor)
          .text(text)
          .attr("font-family", "Manrope, sans-serif")
          .attr("font-size", fontSize)
          .attr("font-weight", fontWeight)
          .attr("fill", "none")
          .attr("stroke", "#0E2A33")
          .attr("stroke-width", "3px")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("opacity", 0.8);

        g.append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", anchor)
          .text(text)
          .attr("font-family", "Manrope, sans-serif")
          .attr("font-size", fontSize)
          .attr("font-weight", fontWeight)
          .attr("fill", "#E2FD48");
      };

      // Specific Labels
      addLegibleText(lyonX - 12, lyonY + 2, "Lyon – Siège", "12px", "800", "end");
      addLegibleText(parisX + 10, parisY + 4, "Paris", "12px", "800");
      addLegibleText(parisX, parisY + 18, "Île-de-France", "10px", "600", "middle", 0.8);
      
      const sudCoords: [number, number] = [5.0, 44.0];
      const [sudX, sudY] = projection(sudCoords) || [0, 0];
      addLegibleText(sudX, sudY, "Sud de la France", "11px", "700", "middle", 0.8);

      // Country Labels
      countries.forEach((d: any) => {
        const centroid = path.centroid(d);
        if (centroid) {
          let labelX = centroid[0];
          let labelY = centroid[1];
          
          if (d.properties.name === "France") {
            return; // Remove France label as requested
          }
          if (d.properties.name === "Switzerland") {
            labelY -= 15; // Move up to avoid arrow
          }
          if (d.properties.name === "Belgium") {
            labelX += 20; // Move right
          }

          addLegibleText(labelX, labelY, d.properties.name, "11px", "700", "middle", 0.7);
        }
      });
    });

  }, []);

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <div className="relative bg-transparent w-full max-w-full md:max-w-[700px] aspect-[4/3] flex items-center justify-center">
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid meet"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default TerritorialMap;
