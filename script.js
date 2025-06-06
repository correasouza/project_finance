const taxas = {
  'Caixa': 0.010487,
  'Santander': 0.010567,
  'Bradesco': 0.010532,
  'Itaú': 0.010519,
  'Nubank': 0.010595,
  'Inter': 0.010602
};

function formatarCampo(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = (parseFloat(valor) / 100).toFixed(2);
  input.value = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularParcela(valor, taxa, meses) {
  return valor * (taxa / (1 - Math.pow(1 + taxa, -meses)));
}

document.getElementById('button-simular').addEventListener('click', function () {
  const valorInput = document.getElementById('valor');
  const bancoInput = document.getElementById('banco');
  const parcelasInput = document.getElementById('parcelas');


  if (!valorInput.value || !bancoInput.value || !parcelasInput.value) {
    alert('Preencha todos os campos para simular o financiamento.');
    return;
  }

  const valor = parseFloat(valorInput.value.replace(/\./g, '').replace(',', '.'));
  const banco = bancoInput.value;
  const meses = parseInt(parcelasInput.value);
  const taxa = taxas[banco];

  const parcela = calcularParcela(valor, taxa, meses);
  const total = parcela * meses;

  localStorage.setItem('banco', banco);
  localStorage.setItem('meses', meses);
  localStorage.setItem('parcela', parcela.toFixed(2));
  localStorage.setItem('total', total.toFixed(2));

  window.location.href = 'results.html';
});
