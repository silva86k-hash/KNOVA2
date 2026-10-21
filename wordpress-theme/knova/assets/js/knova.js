/* Knova — menu mobile, filtros dos achadinhos e janela de detalhes. */
(function () {
	'use strict';

	// Menu mobile
	var toggle = document.querySelector('[data-knova-menu-toggle]');
	var menu = document.getElementById('knova-menu-mobile');
	if (toggle && menu) {
		var setMenu = function (aberto) {
			menu.hidden = !aberto;
			toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
			toggle.querySelector('[data-knova-icon-abrir]').hidden = aberto;
			toggle.querySelector('[data-knova-icon-fechar]').hidden = !aberto;
		};
		toggle.addEventListener('click', function () {
			setMenu(menu.hidden);
		});
		menu.querySelectorAll('[data-knova-menu-link]').forEach(function (link) {
			link.addEventListener('click', function () {
				setMenu(false);
			});
		});
	}

	// Filtros
	var grade = document.querySelector('[data-knova-grade]');
	if (grade) {
		var cards = Array.prototype.slice.call(grade.querySelectorAll('.product-card'));
		var botoes = Array.prototype.slice.call(document.querySelectorAll('[data-knova-categoria]'));
		var selectLoja = document.querySelector('[data-knova-loja]');
		var busca = document.querySelector('[data-knova-busca]');
		var vazio = document.querySelector('[data-knova-vazio]');
		var categoria = 'todas';

		var normalizar = function (texto) {
			return (texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
		};

		var filtrar = function () {
			var termo = normalizar(busca.value);
			var loja = selectLoja.value;
			var visiveis = 0;

			cards.forEach(function (card) {
				var ok =
					(categoria === 'todas' || card.dataset.categoria === categoria) &&
					(loja === 'todas' || card.dataset.loja === loja) &&
					(!termo || normalizar(card.dataset.busca).indexOf(termo) !== -1);
				card.hidden = !ok;
				if (ok) visiveis++;
			});

			grade.hidden = visiveis === 0;
			vazio.hidden = visiveis !== 0;
		};

		var setCategoria = function (valor) {
			categoria = valor;
			botoes.forEach(function (b) {
				b.classList.toggle('selected', b.dataset.knovaCategoria === valor);
			});
		};

		botoes.forEach(function (botao) {
			botao.addEventListener('click', function () {
				setCategoria(botao.dataset.knovaCategoria);
				filtrar();
			});
		});
		selectLoja.addEventListener('change', filtrar);
		busca.addEventListener('input', filtrar);

		var limpar = document.querySelector('[data-knova-limpar]');
		if (limpar) {
			limpar.addEventListener('click', function () {
				busca.value = '';
				selectLoja.value = 'todas';
				setCategoria('todas');
				filtrar();
			});
		}
	}

	// Janela de detalhes
	var modal = document.getElementById('knova-modal');
	if (!modal) return;

	var campo = function (nome) {
		return modal.querySelector('[data-knova-campo="' + nome + '"]');
	};
	var bloco = function (nome) {
		return modal.querySelector('[data-knova-bloco="' + nome + '"]');
	};
	var ultimoFoco = null;

	var fechar = function () {
		modal.hidden = true;
		document.documentElement.classList.remove('knova-modal-aberto');
		if (ultimoFoco) ultimoFoco.focus();
	};

	var abrir = function (p) {
		ultimoFoco = document.activeElement;

		var img = campo('imagem');
		img.src = p.imagem || '';
		img.alt = p.titulo + ' — imagem ilustrativa';
		img.parentNode.hidden = !p.imagem;

		['titulo', 'descricao', 'categoria', 'loja', 'precoAtual', 'precoAntigo', 'parcelamento', 'cupom'].forEach(function (nome) {
			var el = campo(nome);
			el.textContent = p[nome] || '';
			el.hidden = !p[nome];
		});

		var desconto = campo('desconto');
		desconto.textContent = p.desconto !== '' && p.desconto !== null ? '-' + p.desconto + '%' : '';
		desconto.hidden = !desconto.textContent;

		bloco('cupom').hidden = !p.cupom;

		var lista = campo('destaques');
		lista.innerHTML = '';
		(p.destaques || []).forEach(function (item) {
			var li = document.createElement('li');
			li.textContent = item;
			lista.appendChild(li);
		});
		bloco('destaques').hidden = !(p.destaques && p.destaques.length);

		var link = campo('link');
		link.hidden = !p.link;
		link.href = p.link || '#';
		link.querySelector('span').textContent = 'Ver na ' + p.loja;

		modal.hidden = false;
		document.documentElement.classList.add('knova-modal-aberto');
		modal.querySelector('.knova-modal__fechar').focus();
	};

	document.addEventListener('click', function (e) {
		var alvo = e.target.closest('[data-knova-abrir]');
		if (!alvo) return;
		var card = alvo.closest('[data-knova-produto]');
		if (!card) return;
		try {
			abrir(JSON.parse(card.dataset.knovaProduto));
		} catch (err) {
			/* dados inválidos: não abre */
		}
	});

	modal.querySelectorAll('[data-knova-fechar]').forEach(function (el) {
		el.addEventListener('click', fechar);
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && !modal.hidden) fechar();
	});

	var copiar = modal.querySelector('[data-knova-copiar]');
	copiar.addEventListener('click', function () {
		var codigo = campo('cupom').textContent;
		var pronto = function () {
			copiar.textContent = 'Copiado!';
			setTimeout(function () {
				copiar.textContent = 'Copiar';
			}, 2000);
		};
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(codigo).then(pronto, function () {});
		}
	});
})();
