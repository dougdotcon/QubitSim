use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn metropolis(beta: f64, J: f64, spins: Vec<i32>) -> Vec<i32> {
    let size = spins.len();
    let mut new_spins = spins.clone();
    
    for i in 0..size {
        let deltaE = 2.0 * J * (spins[i] as f64) *
            (spins[(i + 1) % size] as f64 + spins[(i + size - 1) % size] as f64);
        
        if deltaE < 0.0 || rand::random::<f64>() < (-beta * deltaE).exp() {
            new_spins[i] *= -1;
        }
    }
    new_spins
}

// wasm-pack build --target web
