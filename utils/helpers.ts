export async function main(T: number): Promise<number> {
  let tello: number = 1;
  let P: number = Math.exp(-1212.2 + 44344 / T + 187.719 * Math.log(T)) + 20;
  let counter = 0;
  while (Math.abs(tello) > 0.01) {
    P = P - 0.001;
    tello = fuzzyBalance(T, P);
    counter++;
  }
  console.log("T :", T, "P :", P, "tello :", tello, " C :", counter)
  return P;
}


function fuzzyBalance(T: number, P: number): number {
  let X: number = 2.3048 * Math.pow(10, -6);
  let Y: number = 2752.29;
  let ZZZ: number = 23.01;
  let aw: number = 1;
  let landa2: number = 3 / 23;
  let alpha: number = 1 / 3;
  let beta: number = 0.4242; // Kelvin/bar;
  let Tc: number = 190.4; // K, critical letants for CH4
  let Pc: number = 46; // bar
  let omega0: number = 0.011;
  let R: number = 83.14; // barcm3/(gmolK);
  let Tr: number = T / Tc;
  let k1: number = 0.37464 + 1.54226 * omega0 - 0.26992 * Math.pow(omega0, 2);
  let alfa: number = Math.pow(1 + k1 * (1 - Math.sqrt(Tr)), 2);
  let a: number = (alfa * 0.45724 * Math.pow(R, 2) * Math.pow(Tc, 2)) / Pc;
  let bbb: number = (0.0778 * R * Tc) / Pc;
  let A: number = (a * P) / Math.pow(R * T, 2);
  let B: number = (bbb * P) / (R * T);
  const Z = solveCubic(
    1,
    B - 1,
    A - 2 * B - 3 * Math.pow(B, 2),
    Math.pow(B, 2) - A * B + Math.pow(B, 3)
  );

  const ZZ = Math.max(...Z);

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

function cuberoot(x: number): number {
  var y = Math.pow(Math.abs(x), 1 / 3);
  return x < 0 ? -y : y;
}

function solveCubic(a: number, b: number, c: number, d: number): number[] {
  if (Math.abs(a) < 1e-8) {
    // Quadratic case, ax^2+bx+c=0
    a = b;
    b = c;
    c = d;
    if (Math.abs(a) < 1e-8) {
      // Linear case, ax+b=0
      a = b;
      b = c;
      if (Math.abs(a) < 1e-8)
        // Degenerate case
        return [];
      return [-b / a];
    }

    var D = b * b - 4 * a * c;
    if (Math.abs(D) < 1e-8) return [-b / (2 * a)];
    else if (D > 0)
      return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
    return [];
  }

  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
  var p = (3 * a * c - b * b) / (3 * a * a);
  var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  var roots: number[];

  if (Math.abs(p) < 1e-8) {
    // p = 0 -> t^3 = -q -> t = -q^1/3
    roots = [cuberoot(-q)];
  } else if (Math.abs(q) < 1e-8) {
    // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    var D = (q * q) / 4 + (p * p * p) / 27;
    if (Math.abs(D) < 1e-8) {
      // D = 0 -> two roots
      roots = [(-1.5 * q) / p, (3 * q) / p];
    } else if (D > 0) {
      // Only one real root
      var u = cuberoot(-q / 2 - Math.sqrt(D));
      roots = [u - p / (3 * u)];
    } else {
      // D < 0, three roots, but needs to use complex numbers/trigonometric solution
      var u = 2 * Math.sqrt(-p / 3);
      var t = Math.acos((3 * q) / p / u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
      var k = (2 * Math.PI) / 3;
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
    }
  }

  // Convert back from depressed cubic
  for (var i = 0; i < roots.length; i++) roots[i] -= b / (3 * a);

  return roots;
}

