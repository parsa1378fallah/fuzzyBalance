import { roots } from "mathjs";
let T = 286; // Kelvin

let P = Math.exp(-1212.2 + 44344 / T + 187.719 * Math.log(T)) + 20; // initial guess

export function mainFunction() {
  let tello = 1;
  let T = 286; // Kelvin

  let P = Math.exp(-1212.2 + 44344 / T + 187.719 * Math.log(T)) + 20; // initial guess

  while (Math.abs(tello) > 0.01) {
    P = P - 0.001;
    tello = fun1(T, P);
    console.log(`P = ${P}`);
    console.log(`T = ${T}, P = ${P}, tello = ${tello}`);
  }
}

export function test() {
  mainFunction(T, P);
}
function fun1(T, P) {
  let X = 2.3048 * Math.pow(10, -6);
  let Y = 2752.29;
  let ZZZ = 23.01;
  let aw = 1;
  let landa2 = 3 / 23;
  let alpha = 1 / 3;
  let beta = 0.4242; // Kelvin/bar;
  let Tc = 190.4; // K, critical letants for CH4
  let Pc = 46; // bar
  let omega0 = 0.011;
  let R = 83.14; // barcm3/(gmolK);
  let Tr = T / Tc;
  let k1 = 0.37464 + 1.54226 * omega0 - 0.26992 * Math.pow(omega0, 2);
  let alfa = Math.pow(1 + k1 * (1 - Math.sqrt(Tr)), 2);
  let a = (alfa * 0.45724 * Math.pow(R, 2) * Math.pow(Tc, 2)) / Pc;
  let bbb = (0.0778 * R * Tc) / Pc;
  let A = (a * P) / Math.pow(R * T, 2);
  let B = (bbb * P) / (R * T);
  let coeff_z = [
    1,
    B - 1,
    A - 2 * B - 3 * Math.pow(B, 2),
    Math.pow(B, 2) - A * B + Math.pow(B, 3),
  ];

  const Z = calculateRoots(coeff_z);
  console.log(Z);
  const ZZ = Math.max(Z);
  const phi = Math.exp(
    ZZ -
      1 -
      Math.log(ZZ - B) -
      (A / (2.82843 * B)) * Math.log((ZZ + 2.414 * B) / (ZZ - 0.414 * B))
  ); // fugasity coefficient
  const fv = phi * P;
  // Calculate the concentration of CO2 (C) for each value of i
  const CC = X * Math.exp(Y / (T - ZZZ));
  const TETA = (fv * CC) / (1 + fv * CC);
  const APRIM = 1584.4 * Math.pow(10, 10);
  const BPRIM = -6591.43;
  const Cprm = 27.04;
  const F0T = APRIM * Math.exp(BPRIM / (T - Cprm));
  const F0P = Math.exp((beta * P) / T);
  const F0aw = Math.pow(aw, -1 / landa2);
  const F0i = F0T * F0P * F0aw;
  const Fi = F0i * Math.pow(1 - TETA, alpha);
  const tello = Math.abs(fv - Fi);

  return tello;
}
function calculateRoots(coefficients) {
  // بررسی طول ضرایب
  const n = coefficients.length;
  if (n < 2) {
    throw new Error("ضرایب باید حداقل دو عدد باشند");
  }

  const roots = [];

  // بدست آوردن ریشه‌های چندجمله‌ای
  for (let i = 0; i < n - 1; i++) {
    const a = coefficients[i];
    const b = coefficients[i + 1];

    // بررسی خاصیت تقسیم بر صفر
    if (a === 0 && b !== 0) {
      roots.push(0);
    } else if (a !== 0 && b === 0) {
      roots.push(Number.POSITIVE_INFINITY);
    } else if (a === 0 && b === 0) {
      roots.push(Number.NaN);
    } else {
      const root = -b / a;
      roots.push(root);
    }
  }
  return roots;
}
