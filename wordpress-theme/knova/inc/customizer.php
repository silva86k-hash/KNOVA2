<?php
/**
 * Textos, imagens e links editáveis em Aparência > Personalizar.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KNOVA_LOJAS_SLOTS', 6 );

function knova_defaults() {
	static $defaults = null;
	if ( null !== $defaults ) {
		return $defaults;
	}

	$defaults = array(
		'seo_descricao'          => 'Eu garimpo. Você recebe. Portal oficial de achadinhos femininos, ofertas e cupons de desconto selecionados da Shopee, Amazon e Mercado Livre.',

		'hero_nota'              => 'OLHA O QUE EU ENCONTREI!',
		'hero_titulo'            => "ACHADINHOS\nQUE VOCÊ\nVAI *AMAR!*",
		'hero_texto'             => "Eu garimpo, filtro e compartilho.\nVocê descobre coisas lindas para o seu dia a dia.",
		'hero_botao'             => 'Bora ver os achadinhos',
		'hero_social'            => 'Seu próximo favorito pode estar aqui.',
		'hero_imagem'            => KNOVA_URI . '/assets/img/hero.png',
		'hero_imagem_alt'        => 'Colagem de bolsa rosa, tênis, fones e maquiagem com detalhes divertidos',
		'hero_etiqueta'          => 'GARIMPOS COM',
		'hero_etiqueta_forte'    => 'PERSONALIDADE.',
		'hero_handle'            => '@ACHADINHOSKNOVA',

		'ofertas_eyebrow'        => 'SEPARADOS PRA VOCÊ',
		'ofertas_titulo'         => 'OFERTAS QUE *VALEM A PENA.*',
		'ofertas_texto'          => "Preços de exemplo para você ter uma ideia.\nConfira o valor final direto na loja.",

		'achadinhos_eyebrow'     => 'VEM GARIMPAR COMIGO',
		'achadinhos_titulo'      => 'SEU PRÓXIMO *FAVORITO.*',
		'achadinhos_texto'       => "Moda, beleza e ideias para a rotina.\nUm cantinho cheio de boas descobertas.",
		'achadinhos_nota'        => '* As imagens acima são ilustrativas para facilitar sua descoberta. Os preços e a disponibilidade devem sempre ser confirmados diretamente nas lojas oficiais.',

		'lojas_eyebrow'          => 'CADA LOJA, UMA DESCOBERTA',
		'lojas_titulo'           => 'ONDE A GENTE *GARIMPA.*',
		'lojas_texto'            => 'Escolha seu destino e continue a descoberta por lá.',
		'lojas_nota'             => 'Dica: Você será direcionada com segurança para as páginas oficiais de cada loja parceira.',

		'sobre_eyebrow'          => '👋 MUITO PRAZER, KNOVA!',
		'sobre_titulo'           => "MENOS BUSCA.\n*MAIS ACHADOS.*",
		'sobre_texto_1'          => 'Um olhar curioso, uma paixão por descobrir e aquele desejo de compartilhar com uma amiga. É assim que nasce a Knova.',
		'sobre_texto_2'          => 'Nosso cantinho reúne inspirações de moda, beleza e rotina. Sem complicação: você descobre aqui e confere todos os detalhes direto na loja oficial.',
		'sobre_itens'            => "Garimpo manual\nLinks verificados\nTransparência sempre",

		'comunidade_nota'        => '💌 AMIGA, NÃO SOME!',
		'comunidade_titulo'      => "O GARIMPO CONTINUA\n*EM TODO LUGAR.*",
		'comunidade_texto'       => 'Escolha o seu cantinho favorito e fique por dentro de cada achadinho, dica e oferta.',

		'rede_instagram_url'     => 'https://www.instagram.com/achadinhosknova/',
		'rede_instagram_handle'  => '@achadinhosknova',
		'rede_tiktok_url'        => 'https://www.tiktok.com/@achadinhos.knova',
		'rede_tiktok_handle'     => '@achadinhos.knova',
		'rede_youtube_url'       => 'https://www.youtube.com/@achadinhosknova',
		'rede_youtube_handle'    => '@achadinhosknova',
		'rede_facebook_url'      => 'https://www.facebook.com/profile.php?id=61594139379934',
		'rede_facebook_handle'   => 'Achadinhos Knova',
		'rede_whatsapp_canal_url'    => 'https://whatsapp.com/channel/0029VbCyhBJE50UZihrdNw42',
		'rede_whatsapp_canal_handle' => 'Receba os achadinhos',
		'rede_whatsapp_grupo_url'    => 'https://chat.whatsapp.com/EWgStsxcdoPJlrrkhW6Nwh',
		'rede_whatsapp_grupo_handle' => 'Receba as ofertas em primeira mão',

		'contato_email'          => 'achadinhosknova@gmail.com',
		'rodape_transparencia_titulo' => 'Transparência no garimpo',
		'rodape_transparencia'   => 'A Knova é uma vitrine de indicações, não uma loja. Links identificados como afiliados podem gerar uma comissão para a Knova, sem custo adicional para você. As imagens são ilustrativas; preços, condições e disponibilidade devem ser consultados nas lojas oficiais.',
		'rodape_copyright'       => 'Achadinhos Knova. Feito para descobrir.',
		'rodape_frase'           => 'Eu garimpo. Você recebe. ♥',
	);

	$lojas = array(
		1 => array( 'Shopee', 'Um pouco de tudo para descobrir', 'https://collshp.com/kelly.knova', 'shopee' ),
		2 => array( 'Amazon', 'De tudo, com entrega rápida', 'https://link.amazon/B07QJXnhm', 'amazon' ),
		3 => array( 'Mercado Livre', 'Do básico ao seu próximo favorito', 'https://www.mercadolivre.com.br/social/silva86k/lists', 'mercado' ),
		4 => array( 'Magazine Luiza', 'Ideias para facilitar a sua casa', 'https://www.magazineluiza.com.br?origem=afiliados&tag=ofertasknova', 'magazine' ),
		5 => array( 'Natura', 'Autocuidado, perfumaria e bem-estar', 'https://www.minhaloja.natura.com/consultoria/achadinhosknova', 'natura' ),
	);
	for ( $i = 1; $i <= KNOVA_LOJAS_SLOTS; $i++ ) {
		$loja = isset( $lojas[ $i ] ) ? $lojas[ $i ] : array( '', '', '', 'shopee' );
		$defaults[ "loja_{$i}_nome" ] = $loja[0];
		$defaults[ "loja_{$i}_desc" ] = $loja[1];
		$defaults[ "loja_{$i}_url" ]  = $loja[2];
		$defaults[ "loja_{$i}_cor" ]  = $loja[3];
	}

	return $defaults;
}

function knova_mod( $chave ) {
	$defaults = knova_defaults();
	return get_theme_mod( $chave, isset( $defaults[ $chave ] ) ? $defaults[ $chave ] : '' );
}

function knova_sanitize_cor_loja( $valor ) {
	return in_array( $valor, array( 'shopee', 'amazon', 'mercado', 'magazine', 'natura' ), true ) ? $valor : 'shopee';
}

function knova_customize_register( $wp_customize ) {
	$defaults = knova_defaults();

	$wp_customize->add_panel(
		'knova',
		array(
			'title'       => 'Knova — textos e links',
			'description' => 'Edite os textos do site. Nos títulos, coloque entre *asteriscos* o trecho que deve ficar destacado em cor. Cada linha vira uma quebra de linha.',
			'priority'    => 20,
		)
	);

	$add = function ( $secao, $chave, $rotulo, $tipo = 'text', $descricao = '' ) use ( $wp_customize, $defaults ) {
		$sanitize = 'sanitize_text_field';
		if ( 'textarea' === $tipo ) {
			$sanitize = 'sanitize_textarea_field';
		} elseif ( 'url' === $tipo || 'image' === $tipo ) {
			$sanitize = 'esc_url_raw';
		} elseif ( 'email' === $tipo ) {
			$sanitize = 'sanitize_email';
		} elseif ( 'cor_loja' === $tipo ) {
			$sanitize = 'knova_sanitize_cor_loja';
		}

		$wp_customize->add_setting(
			$chave,
			array(
				'default'           => isset( $defaults[ $chave ] ) ? $defaults[ $chave ] : '',
				'sanitize_callback' => $sanitize,
			)
		);

		$args = array(
			'section'     => $secao,
			'label'       => $rotulo,
			'description' => $descricao,
		);

		if ( 'image' === $tipo ) {
			$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $chave, $args ) );
			return;
		}
		if ( 'cor_loja' === $tipo ) {
			$args['type']    = 'select';
			$args['choices'] = array(
				'shopee'   => 'Laranja (Shopee)',
				'amazon'   => 'Escuro (Amazon)',
				'mercado'  => 'Amarelo (Mercado Livre)',
				'magazine' => 'Azul (Magazine Luiza)',
				'natura'   => 'Verde (Natura)',
			);
		} else {
			$args['type'] = $tipo;
		}
		$wp_customize->add_control( $chave, $args );
	};

	$secoes = array(
		'knova_geral'      => 'Geral (SEO)',
		'knova_hero'       => 'Topo (destaque principal)',
		'knova_ofertas'    => 'Seção Ofertas',
		'knova_achadinhos' => 'Seção Achadinhos',
		'knova_lojas'      => 'Seção Lojas (onde garimpar)',
		'knova_sobre'      => 'Seção Sobre (A Knova)',
		'knova_comunidade' => 'Seção Comunidade',
		'knova_redes'      => 'Redes sociais',
		'knova_rodape'     => 'Rodapé',
	);
	$prioridade = 10;
	foreach ( $secoes as $id => $titulo ) {
		$wp_customize->add_section( $id, array( 'title' => $titulo, 'panel' => 'knova', 'priority' => $prioridade ) );
		$prioridade += 10;
	}

	$add( 'knova_geral', 'seo_descricao', 'Descrição do site (Google e redes sociais)', 'textarea' );

	$add( 'knova_hero', 'hero_nota', 'Etiqueta amarela' );
	$add( 'knova_hero', 'hero_titulo', 'Título', 'textarea', 'Use *asteriscos* para o trecho destacado.' );
	$add( 'knova_hero', 'hero_texto', 'Texto', 'textarea' );
	$add( 'knova_hero', 'hero_botao', 'Texto do botão' );
	$add( 'knova_hero', 'hero_social', 'Frase abaixo do botão' );
	$add( 'knova_hero', 'hero_imagem', 'Imagem', 'image' );
	$add( 'knova_hero', 'hero_imagem_alt', 'Descrição da imagem (acessibilidade)' );
	$add( 'knova_hero', 'hero_etiqueta', 'Etiqueta da imagem (linha 1)' );
	$add( 'knova_hero', 'hero_etiqueta_forte', 'Etiqueta da imagem (linha 2, em negrito)' );
	$add( 'knova_hero', 'hero_handle', 'Arroba sobre a imagem' );

	foreach ( array( 'ofertas', 'achadinhos', 'lojas' ) as $sec ) {
		$add( "knova_{$sec}", "{$sec}_eyebrow", 'Etiqueta acima do título' );
		$add( "knova_{$sec}", "{$sec}_titulo", 'Título', 'textarea', 'Use *asteriscos* para o trecho destacado.' );
		$add( "knova_{$sec}", "{$sec}_texto", 'Texto', 'textarea' );
	}
	$add( 'knova_achadinhos', 'achadinhos_nota', 'Observação abaixo dos produtos', 'textarea' );
	$add( 'knova_lojas', 'lojas_nota', 'Observação abaixo das lojas', 'textarea' );
	for ( $i = 1; $i <= KNOVA_LOJAS_SLOTS; $i++ ) {
		$add( 'knova_lojas', "loja_{$i}_nome", "Loja {$i} — nome", 'text', 1 === $i ? 'Deixe nome ou link vazio para esconder a loja.' : '' );
		$add( 'knova_lojas', "loja_{$i}_desc", "Loja {$i} — frase" );
		$add( 'knova_lojas', "loja_{$i}_url", "Loja {$i} — link", 'url' );
		$add( 'knova_lojas', "loja_{$i}_cor", "Loja {$i} — cor", 'cor_loja' );
	}

	$add( 'knova_sobre', 'sobre_eyebrow', 'Etiqueta acima do título' );
	$add( 'knova_sobre', 'sobre_titulo', 'Título', 'textarea', 'Use *asteriscos* para o trecho destacado.' );
	$add( 'knova_sobre', 'sobre_texto_1', 'Parágrafo 1', 'textarea' );
	$add( 'knova_sobre', 'sobre_texto_2', 'Parágrafo 2', 'textarea' );
	$add( 'knova_sobre', 'sobre_itens', 'Itens com ✔ (um por linha)', 'textarea' );

	$add( 'knova_comunidade', 'comunidade_nota', 'Etiqueta acima do título' );
	$add( 'knova_comunidade', 'comunidade_titulo', 'Título', 'textarea', 'Use *asteriscos* para o trecho destacado.' );
	$add( 'knova_comunidade', 'comunidade_texto', 'Texto', 'textarea' );

	$redes = array(
		'instagram'      => 'Instagram',
		'tiktok'         => 'TikTok',
		'youtube'        => 'YouTube',
		'facebook'       => 'Facebook',
		'whatsapp_canal' => 'Canal do WhatsApp',
		'whatsapp_grupo' => 'Grupo do WhatsApp',
	);
	foreach ( $redes as $rede => $nome ) {
		$add( 'knova_redes', "rede_{$rede}_url", "{$nome} — link", 'url', 'instagram' === $rede ? 'Deixe o link vazio para esconder a rede.' : '' );
		$add( 'knova_redes', "rede_{$rede}_handle", "{$nome} — texto abaixo do nome" );
	}

	$add( 'knova_rodape', 'contato_email', 'E-mail de contato', 'email' );
	$add( 'knova_rodape', 'rodape_transparencia_titulo', 'Título do aviso de transparência' );
	$add( 'knova_rodape', 'rodape_transparencia', 'Aviso de transparência', 'textarea' );
	$add( 'knova_rodape', 'rodape_copyright', 'Texto após o © e o ano' );
	$add( 'knova_rodape', 'rodape_frase', 'Frase final' );
}
add_action( 'customize_register', 'knova_customize_register' );
