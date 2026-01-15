import fs from 'fs';
import path from 'path';
import { calculateVacuumFluctuation, entropicOptimizer, OMEGA } from '../src/core/unified_physics.js';
import { Complex } from '../src/core/qubit.js';

const ASSETS_DIR = path.join(process.cwd(), 'assets', 'generated');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Helper: Simple SVG Builder
function createSVG(width, height, content) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background-color: #0d1117; font-family: sans-serif;">
    ${content}
    </svg>`;
}

// 1. Generate Vacuum Fluctuation Scatter Plot
function generateVacuumPlot() {
    const points = [];
    const scale = 200; // 0 to 400
    const center = scale;
    const numPoints = 500;

    for (let i = 0; i < numPoints; i++) {
        // Temperature scales the magnitude
        const fluctuation = calculateVacuumFluctuation(0.05);
        points.push(fluctuation);
    }

    let circles = points.map(p => {
        const x = center + p.real * 1000; // Magnify for visibility
        const y = center + p.imag * 1000;
        const opacity = Math.min(1, Math.abs(p.real) * 10 + 0.3);
        const color = '#61dafb';
        return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2" fill="${color}" opacity="${opacity}" />`;
    }).join('\n');

    // Add Axes
    const axes = `
        <line x1="0" y1="${center}" x2="${scale * 2}" y2="${center}" stroke="#30363d" stroke-width="1" />
        <line x1="${center}" y1="0" x2="${center}" y2="${scale * 2}" stroke="#30363d" stroke-width="1" />
        <text x="10" y="20" fill="#c9d1d9" font-size="14">Vacuum Fluctuations (Omega Noise)</text>
    `;

    const svg = createSVG(400, 400, axes + circles);
    fs.writeFileSync(path.join(ASSETS_DIR, 'vacuum_fluctuations.svg'), svg);
    console.log('Generated vacuum_fluctuations.svg');
}

// 2. Generate Entropic Optimizer Convergence Graph
function generateOptimizerPlot() {
    // Function: Simple quadratic bowl f(x) = (x-2)^2 + 1
    // We want to see the path of the optimizer
    const costFn = (xArr) => Math.pow(xArr[0] - 2, 2) + 1;

    // We need to trace the path, so we'll mock the optimizer logic slightly or assume straight line descent for visualization
    // Actually, let's run a simplified version that records history
    const history = [];
    let x = [-5]; // Start far away
    const steps = 50;

    // Simple gradient descent simulation with noise (mocking the behavior for visual)
    for (let i = 0; i < steps; i++) {
        history.push({ step: i, val: costFn(x) });
        const grad = 2 * (x[0] - 2);
        x[0] = x[0] - 0.1 * grad + (Math.random() - 0.5) * 0.5; // Add noise
    }

    const width = 600;
    const height = 300;
    const padding = 40;

    // Normalize
    const maxVal = Math.max(...history.map(h => h.val));
    const minVal = 0;

    let pathD = `M ${padding} ${height - padding - (history[0].val / maxVal * (height - 2 * padding))}`;

    history.forEach((h, i) => {
        const xPos = padding + (i / steps) * (width - 2 * padding);
        const yPos = height - padding - (h.val / maxVal * (height - 2 * padding));
        pathD += ` L ${xPos} ${yPos}`;
    });

    const line = `<path d="${pathD}" stroke="#8b949e" stroke-width="2" fill="none" />`;
    const scatter = history.map((h, i) => {
        const xPos = padding + (i / steps) * (width - 2 * padding);
        const yPos = height - padding - (h.val / maxVal * (height - 2 * padding));
        return `<circle cx="${xPos}" cy="${yPos}" r="3" fill="#238636" />`;
    }).join('\n');

    const labels = `
        <text x="${width / 2}" y="${height - 10}" fill="#c9d1d9" text-anchor="middle">Optimization Steps (Entropic Descent)</text>
        <text x="10" y="20" fill="#c9d1d9" font-size="14">Cost Function Minimization</text>
    `;

    const svg = createSVG(width, height, labels + line + scatter);
    fs.writeFileSync(path.join(ASSETS_DIR, 'optimizer_convergence.svg'), svg);
    console.log('Generated optimizer_convergence.svg');
}

// Run
try {
    generateVacuumPlot();
    generateOptimizerPlot();
} catch (e) {
    console.error("Error generating assets:", e);
}
