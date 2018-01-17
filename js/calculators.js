function hudsonCalculateHeight(form) {
    var M = parseFloat(form.M.value);
    var rho_a = parseFloat(form.rho_a.value);
    var rho_w = parseFloat(form.rho_w.value);
    var k_d = parseFloat(form.k_d.value);
    var slope = parseFloat(form.slope.value);
    var delta = rho_a / rho_w - 1

    result = Math.pow((M * k_d * Math.pow(delta, 3) * slope / rho_a), 1 / 3)
    form.H.value = Math.round(result * 100) / 100;
}

function hudsonCalculateMass(form) {
    var H = parseFloat(form.H.value);
    var rho_a = parseFloat(form.rho_a.value);
    var rho_w = parseFloat(form.rho_w.value);
    var k_d = parseFloat(form.k_d.value);
    var slope = parseFloat(form.slope.value);
    var delta = rho_a / rho_w - 1;

    result = rho_a * Math.pow(H, 3) / (k_d * Math.pow(delta, 3) * slope);
    form.M.value = Math.round(result);
}

function godaCalculateBreakerIndex(form) {
    var T = parseFloat(form.T.value);
    var d_b = parseFloat(form.d_b.value);
    var s = parseFloat(form.s.value);
    var g = 9.8;
    var pi = Math.PI;
    var L_0 = g * Math.pow(T, 2) / (2 * pi);

    var result =  0.12 / (d_b / L_0) * (1 - Math.exp(-1.5 * pi * (d_b / L_0) * (1 + 11 * Math.pow(s, 4 / 3))));
    form.gamma.value = Math.round(result * 100) / 100;

}
