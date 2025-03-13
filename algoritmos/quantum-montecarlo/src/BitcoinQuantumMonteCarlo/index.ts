import init, { metropolis } from "./wasm/qmc_bg.wasm";

async function runWASM() {
    await init();
    const spins = Array(20).fill(1);
    const newSpins = metropolis(1.0, 1.0, spins);
    console.log("Novo estado de spins:", newSpins);
}
runWASM();
