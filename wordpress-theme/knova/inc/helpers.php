<?php
/**
 * Funções auxiliares usadas nos templates.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Retorna um ícone SVG.
 */
function knova_icon( $name, $class = 'w-4 h-4' ) {
	$nodes = knova_icon_nodes();
	if ( ! isset( $nodes[ $name ] ) ) {
		return '';
	}

	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-%1$s %2$s" aria-hidden="true">%3$s</svg>',
		esc_attr( $name ),
		esc_attr( $class ),
		$nodes[ $name ]
	);
}

/**
 * Texto com quebras de linha convertidas em <br>.
 */
function knova_lines( $text ) {
	return nl2br( esc_html( trim( (string) $text ) ), false );
}

/**
 * Título de seção: quebras de linha viram <br> e o trecho entre *asteriscos* fica destacado.
 */
function knova_title( $texto ) {
	$html = knova_lines( $texto );
	return preg_replace( '/\*([^*]+)\*/', '<span>$1</span>', $html );
}

function knova_money( $valor ) {
	if ( '' === $valor || null === $valor ) {
		return '';
	}
	return 'R$ ' . number_format( (float) $valor, 2, ',', '.' );
}

function knova_logo_url() {
	$logo_id = get_theme_mod( 'custom_logo' );
	if ( $logo_id ) {
		$url = wp_get_attachment_image_url( $logo_id, 'full' );
		if ( $url ) {
			return $url;
		}
	}
	return KNOVA_URI . '/assets/img/logo.png';
}

function knova_brand( $label ) {
	printf(
		'<a class="brand brand-logo" href="%1$s" aria-label="%2$s"><img src="%3$s" alt="%4$s" width="120" height="120" class="w-[120px] h-auto object-contain" /></a>',
		esc_url( home_url( '/' ) ),
		esc_attr( $label ),
		esc_url( knova_logo_url() ),
		esc_attr( get_bloginfo( 'name' ) )
	);
}

/**
 * Redes sociais configuradas no Personalizador (as vazias são ignoradas).
 */
function knova_socials() {
	$redes = array(
		array( 'key' => 'instagram', 'classe' => 'social-ig', 'icone' => 'instagram', 'nome' => 'Instagram' ),
		array( 'key' => 'tiktok', 'classe' => 'social-tt', 'icone' => '', 'nome' => 'TikTok' ),
		array( 'key' => 'youtube', 'classe' => 'social-yt', 'icone' => 'youtube', 'nome' => 'YouTube' ),
		array( 'key' => 'facebook', 'classe' => 'social-fb', 'icone' => 'facebook', 'nome' => 'Facebook' ),
		array( 'key' => 'whatsapp_canal', 'classe' => 'social-wc', 'icone' => 'message-circle', 'nome' => 'Canal WhatsApp' ),
		array( 'key' => 'whatsapp_grupo', 'classe' => 'social-wg', 'icone' => 'users', 'nome' => 'Grupo de ofertas' ),
	);

	$lista = array();
	foreach ( $redes as $rede ) {
		$url = knova_mod( 'rede_' . $rede['key'] . '_url' );
		if ( ! $url ) {
			continue;
		}
		$rede['url']    = $url;
		$rede['handle'] = knova_mod( 'rede_' . $rede['key'] . '_handle' );
		$lista[]        = $rede;
	}
	return $lista;
}

function knova_social_icon( $rede, $class ) {
	if ( '' === $rede['icone'] ) {
		return '<span class="font-black ' . ( 'w-5 h-5' === $class ? 'text-sm' : 'text-xs' ) . '">TT</span>';
	}
	return knova_icon( $rede['icone'], $class );
}

/**
 * Lojas da seção "Onde a gente garimpa".
 */
function knova_lojas() {
	$lojas = array();
	for ( $i = 1; $i <= KNOVA_LOJAS_SLOTS; $i++ ) {
		$nome = knova_mod( "loja_{$i}_nome" );
		$url  = knova_mod( "loja_{$i}_url" );
		if ( ! $nome || ! $url ) {
			continue;
		}
		$lojas[] = array(
			'nome'   => $nome,
			'desc'   => knova_mod( "loja_{$i}_desc" ),
			'url'    => $url,
			'classe' => knova_mod( "loja_{$i}_cor" ),
		);
	}
	return $lojas;
}
