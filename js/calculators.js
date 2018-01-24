function hudsonCalculateHeight(form) {
  var M = parseFloat(form.M.value);
  var rho_a = parseFloat(form.rho_a.value);
  var rho_w = parseFloat(form.rho_w.value);
  var k_d = parseFloat(form.k_d.value);
  var slope = parseFloat(form.slope.value);
  var delta = rho_a / rho_w - 1;

  result = Math.pow((M * k_d * Math.pow(delta, 3) * slope / rho_a), 1 / 3);
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

  var result = 0.12 / (d_b / L_0) * (1 - Math.exp(-1.5 * pi * (d_b / L_0) * (1 + 11 * Math.pow(s, 4 / 3))));
  form.gamma.value = Math.round(result * 100) / 100;
}

function huntCalculateWavelength(form) {
  var T = parseFloat(form.T.value);
  var d = parseFloat(form.d.value);

  var pi = Math.PI;
  var w = 2 * pi / T;
  var g = 9.8;

  var a1 = 0.666;
  var a2 = 0.355;
  var a3 = 0.1608465608;
  var a4 = 0.063209;
  var a5 = 0.0217540484;
  var a6 = 0.0065407983;

  var y = Math.pow(w, 2) * d / g;
  var y1 = a1 * y + a2 * Math.pow(y, 2) + a3 * Math.pow(y, 3) + a4 * Math.pow(y, 4) + a5 * Math.pow(y, 5) + a6 * Math.pow(y, 6);
  var y2 = Math.pow(y, 2) + y / (1 + y1);

  var L_0 = 2 * pi * d / Math.sqrt(y2);
  form.L.value = Math.round(L_0 * 10) / 10;
  form.H_max.value = Math.round(L_0 / 7 * 10) / 10;

  var depth_ratio = d / L_0;
  var regime = "intermediate";
  if (depth_ratio > 0.5) {
    regime = "deep";
  }
  if (depth_ratio < 0.05) {
    regime = "shallow";
  }
  form.regime.value = regime;
}

var length_exponent = 1;
var time_exponent = 1 / 2;
var mass_exponent = 3;

function froudeModelToProto(form) {
  var length_scale = parseFloat(form.L.value);

  var model_length = form.model_length.value;
  form.proto_length.value = model_length * Math.pow(length_scale, length_exponent);
}

function froudeProtoToModel(form) {
  var length_scale = parseFloat(form.L.value);

  var proto_length = form.proto_length.value;
  form.model_length.value = proto_length * Math.pow(length_scale, -length_exponent);

}
