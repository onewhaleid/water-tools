function hudsonCalculateHeight(form) {
  var M = parseFloat(form.M.value);
  var rho_a = parseFloat(form.rho_a.value);
  var rho_w = parseFloat(form.rho_w.value);
  var k_d = parseFloat(form.k_d.value);
  var slope = parseFloat(form.slope.value);
  var delta = rho_a / rho_w - 1;

  result = Math.pow((M * k_d * Math.pow(delta, 3) * slope / rho_a), 1 / 3);
  form.H.value = Math.round(result * 100) / 100;
};

function hudsonCalculateMass(form) {
  var H = parseFloat(form.H.value);
  var rho_a = parseFloat(form.rho_a.value);
  var rho_w = parseFloat(form.rho_w.value);
  var k_d = parseFloat(form.k_d.value);
  var slope = parseFloat(form.slope.value);
  var delta = rho_a / rho_w - 1;

  result = rho_a * Math.pow(H, 3) / (k_d * Math.pow(delta, 3) * slope);
  form.M.value = Math.round(result);
};

function godaCalculateBreakerIndex(form) {
  var T = parseFloat(form.T.value);
  var d_b = parseFloat(form.d_b.value);
  var s = parseFloat(form.s.value);
  var g = 9.8;
  var pi = Math.PI;
  var L_0 = g * Math.pow(T, 2) / (2 * pi);

  var result = 0.12 / (d_b / L_0) * (1 - Math.exp(-1.5 * pi * (d_b / L_0) * (1 + 11 * Math.pow(s, 4 / 3))));
  form.gamma.value = Math.round(result * 100) / 100;
};

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
};

var length_exponent = 1;
var time_exponent = 1 / 2;
var mass_exponent = 3;
var velocity_exponent = 1 / 2;
var acceleration_exponent = 0;
var pressure_exponent = 1;
var force_exponent = 3;
var overtopping_exponent = 3 / 2;
var spectral_energy_exponent = 5 / 2;

function froudeModelToProto(form) {
  var length_scale = parseFloat(form.L.value);

  var model_length = toBaseUnit(form.model_length.value, form.model_length_unit.value);
  form.proto_length.value = toDisplayUnit(model_length * Math.pow(length_scale, length_exponent), form.proto_length_unit.value);

  var model_time = toBaseUnit(form.model_time.value, form.model_time_unit.value);
  form.proto_time.value = toDisplayUnit(model_time * Math.pow(length_scale, time_exponent), form.proto_time_unit.value);

  var model_mass = toBaseUnit(form.model_mass.value, form.model_mass_unit.value);
  form.proto_mass.value = toDisplayUnit(model_mass * Math.pow(length_scale, mass_exponent), form.proto_mass_unit.value);

  var model_velocity = toBaseUnit(form.model_velocity.value, form.model_velocity_unit.value);
  form.proto_velocity.value = toDisplayUnit(model_velocity * Math.pow(length_scale, velocity_exponent), form.proto_velocity_unit.value);

  var model_acceleration = toBaseUnit(form.model_acceleration.value, form.model_acceleration_unit.value);
  form.proto_acceleration.value = toDisplayUnit(model_acceleration * Math.pow(length_scale, acceleration_exponent), form.proto_acceleration_unit.value);

  var model_pressure = toBaseUnit(form.model_pressure.value, form.model_pressure_unit.value);
  form.proto_pressure.value = toDisplayUnit(model_pressure * Math.pow(length_scale, pressure_exponent), form.proto_pressure_unit.value);

  var model_force = toBaseUnit(form.model_force.value, form.model_force_unit.value);
  form.proto_force.value = toDisplayUnit(model_force * Math.pow(length_scale, force_exponent), form.proto_force_unit.value);

  var model_overtopping = toBaseUnit(form.model_overtopping.value, form.model_overtopping_unit.value);
  form.proto_overtopping.value = toDisplayUnit(model_overtopping * Math.pow(length_scale, overtopping_exponent), form.proto_overtopping_unit.value);

  var model_spectral_energy = toBaseUnit(form.model_spectral_energy.value, form.model_spectral_energy_unit.value);
  form.proto_spectral_energy.value = toDisplayUnit(model_spectral_energy * Math.pow(length_scale, spectral_energy_exponent), form.proto_spectral_energy_unit.value);

  roundAllInputs(form);
};

function froudeProtoToModel(form) {
  var length_scale = parseFloat(form.L.value);

  var proto_length = toBaseUnit(form.proto_length.value, form.proto_length_unit.value);
  form.model_length.value = toDisplayUnit(proto_length * Math.pow(length_scale, -length_exponent), form.model_length_unit.value);

  var proto_time = toBaseUnit(form.proto_time.value, form.proto_time_unit.value);
  form.model_time.value = toDisplayUnit(proto_time * Math.pow(length_scale, -time_exponent), form.model_time_unit.value);

  var proto_mass = toBaseUnit(form.proto_mass.value, form.proto_mass_unit.value);
  form.model_mass.value = toDisplayUnit(proto_mass * Math.pow(length_scale, -mass_exponent), form.model_mass_unit.value);

  var proto_velocity = toBaseUnit(form.proto_velocity.value, form.proto_velocity_unit.value);
  form.model_velocity.value = toDisplayUnit(proto_velocity * Math.pow(length_scale, -velocity_exponent), form.model_velocity_unit.value);

  var proto_acceleration = toBaseUnit(form.proto_acceleration.value, form.proto_acceleration_unit.value);
  form.model_acceleration.value = toDisplayUnit(proto_acceleration * Math.pow(length_scale, -acceleration_exponent), form.model_acceleration_unit.value);

  var proto_pressure = toBaseUnit(form.proto_pressure.value, form.proto_pressure_unit.value);
  form.model_pressure.value = toDisplayUnit(proto_pressure * Math.pow(length_scale, -pressure_exponent), form.model_pressure_unit.value);

  var proto_force = toBaseUnit(form.proto_force.value, form.proto_force_unit.value);
  form.model_force.value = toDisplayUnit(proto_force * Math.pow(length_scale, -force_exponent), form.model_force_unit.value);

  var proto_overtopping = toBaseUnit(form.proto_overtopping.value, form.proto_overtopping_unit.value);
  form.model_overtopping.value = toDisplayUnit(proto_overtopping * Math.pow(length_scale, -overtopping_exponent), form.model_overtopping_unit.value);

  var proto_spectral_energy = toBaseUnit(form.proto_spectral_energy.value, form.proto_spectral_energy_unit.value);
  form.model_spectral_energy.value = toDisplayUnit(proto_spectral_energy * Math.pow(length_scale, -spectral_energy_exponent), form.model_spectral_energy_unit.value);

  roundAllInputs(form);
};

function froudeChangeLengthScale(form) {
  if (form.model_proto_switch.checked) {
    froudeModelToProto(form);
  } else {
    froudeProtoToModel(form);
  }
};

var conversion_factors = {
  'mm': 1000,
  'm': 1,
  'km': 1 / 1000,
  's': 1,
  'min': 1 / 60,
  'h': 1 / 60 / 60,
  'g': 1000,
  'kg': 1,
  't': 1 / 1000,
  'cm/s': 100,
  'm/s': 1,
  'km/h': 1 / 1000 * 60 * 60,
  'cm/s/s': 100,
  'm/s/s': 1,
  'Pa': 1,
  'kPa': 1000,
  'MPa': 1000 * 1000,
  'N': 1,
  'kN': 1 / 1000,
  'L/m/s': 1,
  'mm.mm.s': 1000 * 1000,
  'm.m.s': 1,
};

function toBaseUnit(val, from_unit) {
  return val / conversion_factors[from_unit]
};

function toDisplayUnit(val, from_unit) {
  return val * conversion_factors[from_unit]
};

function roundAllInputs(form) {
  var elements = form.elements;
  for (i = 0; i < elements.length; i++) {
    // Don't round active element
    if (elements[i] === document.activeElement) {
      continue;
    } else if (elements[i].type === 'text') {
      // Round to 2 decimal places
      elements[i].value = Math.round(parseFloat(elements[i].value) * 100) / 100;
    }
  }
}
