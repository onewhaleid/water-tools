function matchInput() {
  var input1 = document.getElementById("input1");
  var input2 = document.getElementById("input2");
  input2.value = input1.value;
}

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
