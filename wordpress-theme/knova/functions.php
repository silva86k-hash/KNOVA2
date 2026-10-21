<?php
/**
 * Tema Knova Achadinhos.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KNOVA_VERSION', '1.0.0' );
define( 'KNOVA_DIR', get_template_directory() );
define( 'KNOVA_URI', get_template_directory_uri() );

require KNOVA_DIR . '/inc/icons-data.php';
require KNOVA_DIR . '/inc/helpers.php';
require KNOVA_DIR . '/inc/produtos.php';
require KNOVA_DIR . '/inc/customizer.php';
require KNOVA_DIR . '/inc/seed.php';

function knova_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 240,
			'width'       => 240,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
}
add_action( 'after_setup_theme', 'knova_setup' );

function knova_assets() {
	wp_enqueue_style(
		'knova-fonts',
		'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'knova', KNOVA_URI . '/assets/css/knova.css', array( 'knova-fonts' ), KNOVA_VERSION );
	wp_enqueue_style( 'knova-extra', KNOVA_URI . '/assets/css/knova-extra.css', array( 'knova' ), KNOVA_VERSION );
	wp_enqueue_script( 'knova', KNOVA_URI . '/assets/js/knova.js', array(), KNOVA_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
}
add_action( 'wp_enqueue_scripts', 'knova_assets' );

function knova_head_meta() {
	$descricao = knova_mod( 'seo_descricao' );
	if ( $descricao ) {
		printf( '<meta name="description" content="%s" />' . "\n", esc_attr( $descricao ) );
		printf( '<meta property="og:description" content="%s" />' . "\n", esc_attr( $descricao ) );
	}
	printf( '<meta property="og:title" content="%s" />' . "\n", esc_attr( wp_get_document_title() ) );
	echo '<meta property="og:type" content="website" />' . "\n";
	echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
	echo '<meta name="theme-color" content="#00CDBA" />' . "\n";
	echo '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
	echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
}
add_action( 'wp_head', 'knova_head_meta', 1 );
