<?php
/**
 * Na primeira ativação do tema, cadastra os achadinhos que já estavam no site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function knova_produtos_iniciais() {
	return array(
		array(
			'titulo'       => 'Tênis branco para o dia a dia',
			'imagem'       => 'produto-1.png',
			'descricao'    => 'Uma inspiração para os seus looks do dia a dia. Confortável, estiloso e com preço amigo na Shopee.',
			'loja'         => 'shopee',
			'categoria'    => 'moda',
			'link'         => 'https://collshp.com/kelly.knova',
			'preco_antigo' => '149.9',
			'preco_atual'  => '89.9',
			'desconto'     => '40',
			'parcelamento' => 'em até 3x de R$ 29,97 sem juros',
			'cupom'        => 'KNOVA10',
			'selo'         => 'MAIS PROCURADO',
			'etiqueta'     => 'NO RADAR',
			'destaques'    => "Solado macio para caminhar o dia todo sem cansar\nDesign clean versátil: vai do look casual ao arrumadinho\nAcabamento reforçado fácil de limpar\nCombina com calça jeans, shorts, vestidos e alfaiataria",
		),
		array(
			'titulo'       => 'Bolsa rosa que completa o look',
			'imagem'       => 'produto-2.png',
			'descricao'    => 'Para quem ama um acessório com personalidade. O toque de cor perfeito para alegrar os seus dias.',
			'loja'         => 'mercadolivre',
			'categoria'    => 'moda',
			'link'         => 'https://www.mercadolivre.com.br/social/silva86k/lists',
			'preco_antigo' => '99.9',
			'preco_atual'  => '59.9',
			'desconto'     => '40',
			'parcelamento' => 'em até 2x de R$ 29,95',
			'cupom'        => 'MELIKNOVA',
			'selo'         => 'OFERTA RELÂMPAGO',
			'etiqueta'     => 'FUI TESTAR',
			'destaques'    => "Tamanho compacto com ótimo espaço interno\nAlça regulável confortável para ombro ou transversal\nTom de rosa chic que dá personalidade a qualquer visual\nFecho magnético prático e seguro",
		),
		array(
			'titulo'       => 'Fone de ouvido para sua playlist',
			'imagem'       => 'produto-3.png',
			'descricao'    => 'Explore opções e encontre o seu estilo. Som nítido, graves envolventes e acabamento clean.',
			'loja'         => 'amazon',
			'categoria'    => 'tecnologia',
			'link'         => 'https://link.amazon/B07QJXnhm',
			'preco_antigo' => '129.9',
			'preco_atual'  => '79.9',
			'desconto'     => '38',
			'parcelamento' => 'em até 2x de R$ 39,95 sem juros',
			'cupom'        => 'PRIME10',
			'selo'         => 'QUERIDINHO',
			'etiqueta'     => 'DICA DE AMIGA',
			'destaques'    => "Visual aesthetic super elegante para estudos e passeios\nAlmofadas confortáveis que não apertam\nConexão Bluetooth rápida e estável\nBateria duradoura para ouvir música o dia inteiro",
		),
		array(
			'titulo'       => 'Kit de beleza para se cuidar',
			'imagem'       => 'produto-4.png',
			'descricao'    => 'Inspiração para descobrir novos favoritos de beleza. Cuidado diário, fragrância acolhedora e hidratação profunda.',
			'loja'         => 'natura',
			'categoria'    => 'beleza',
			'link'         => 'https://www.minhaloja.natura.com/consultoria/achadinhosknova',
			'preco_antigo' => '79.9',
			'preco_atual'  => '49.9',
			'desconto'     => '38',
			'parcelamento' => 'em até 2x de R$ 24,95',
			'cupom'        => 'NATURAKNOVA',
			'selo'         => 'DESTAQUE',
			'etiqueta'     => 'SUPER ACHADO',
			'destaques'    => "Fórmula hidratante com fragrância delicada e marcante\nIdeal para ter sempre na bolsa ou na nécessaire\nEmbalagem presenteável super charmosa\nDermatologicamente testado",
		),
	);
}

/**
 * Copia uma imagem da pasta do tema para a Biblioteca de Mídia.
 */
function knova_importar_imagem( $arquivo, $post_id, $titulo ) {
	$caminho = KNOVA_DIR . '/assets/img/' . $arquivo;
	if ( ! file_exists( $caminho ) ) {
		return 0;
	}

	$upload = wp_upload_bits( sanitize_title( $titulo ) . '.png', null, file_get_contents( $caminho ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}

	$anexo_id = wp_insert_attachment(
		array(
			'post_mime_type' => 'image/png',
			'post_title'     => $titulo,
			'post_status'    => 'inherit',
		),
		$upload['file'],
		$post_id
	);
	if ( is_wp_error( $anexo_id ) || ! $anexo_id ) {
		return 0;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata( $anexo_id, wp_generate_attachment_metadata( $anexo_id, $upload['file'] ) );
	update_post_meta( $anexo_id, '_wp_attachment_image_alt', $titulo . ' — imagem ilustrativa' );

	return $anexo_id;
}

function knova_cadastrar_produtos_iniciais() {
	if ( get_option( 'knova_produtos_iniciais' ) ) {
		return;
	}
	update_option( 'knova_produtos_iniciais', 1 );

	$existentes = get_posts( array( 'post_type' => 'knova_produto', 'post_status' => 'any', 'posts_per_page' => 1, 'fields' => 'ids' ) );
	if ( $existentes ) {
		return;
	}

	foreach ( knova_produtos_iniciais() as $ordem => $produto ) {
		$post_id = wp_insert_post(
			array(
				'post_type'   => 'knova_produto',
				'post_status' => 'publish',
				'post_title'  => $produto['titulo'],
				'menu_order'  => $ordem,
			)
		);
		if ( ! $post_id || is_wp_error( $post_id ) ) {
			continue;
		}

		foreach ( array( 'descricao', 'loja', 'categoria', 'link', 'preco_antigo', 'preco_atual', 'desconto', 'parcelamento', 'cupom', 'selo', 'etiqueta', 'destaques' ) as $chave ) {
			update_post_meta( $post_id, '_knova_' . $chave, $produto[ $chave ] );
		}
		update_post_meta( $post_id, '_knova_destaque', '1' );

		$anexo_id = knova_importar_imagem( $produto['imagem'], $post_id, $produto['titulo'] );
		if ( $anexo_id ) {
			set_post_thumbnail( $post_id, $anexo_id );
		}
	}
}

function knova_ativacao() {
	knova_registrar_produtos();
	knova_cadastrar_produtos_iniciais();
}
add_action( 'after_switch_theme', 'knova_ativacao' );
