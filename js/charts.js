import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const chartMain = document.getElementById('chartMain');

const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 7 },
    { x: 5, y: 4 },
    { x: 6, y: 8 },
    { x: 7, y: 10 },
    { x: 8, y: 12 },
    { x: 9, y: 11 },
    { x: 10, y: 13 }
];

// Dimensiones del gráfico
const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

// Crear el SVG
const svg = d3.select(chartMain)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Definir escalas
const x = d3.scaleLinear()
    .domain([1, 10])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height, 0]);

// Añadir ejes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);

svg.append('g')
    .call(yAxis);

// Crear línea
const line = d3.line()
    .x(d => x(d.x))
    .y(d => y(d.y));

// Añadir la línea al SVG
svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line);

