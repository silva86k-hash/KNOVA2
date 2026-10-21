<?php
/**
 * Tipo de conteúdo "Achadinhos" (produtos) e seus campos.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function knova_lojas_produto() {
	return array(
		'shopee'       => 'Shopee',
		'amazon'       => 'Amazon',
		'mercadolivre' => 'Mercado Livre',
		'magalu'       => 'Magazine Luiza',
		'natura'       => 'Natura',
		'outra'        => 'Outra loja',
	);
}

function knova_categorias_produto() {
	return array(
		'moda'       => 'Moda',
		'beleza'     => 'Beleza',
		'tecnologia' => 'Tecnologia',
		'casa'       => 'Casa',
		'outros'     => 'Outros',
	);
}

/**
 * Campos do produto: chave => [rótulo, tipo, ajuda].
 */
function knova_campos_produto() {
	return array(
		'descricao'    => array( 'Descrição curta', 'textarea', 'Aparece no card do achadinho.' ),
		'loja'         => array( 'Loja', 'loja', '' ),
		'loja_nome'    => array( 'Nome da loja exibido', 'text', 'Opcional. Se vazio, usa o nome da loja escolhida acima.' ),
		'categoria'    => array( 'Categoria', 'categoria', 'Define em qual filtro (Moda, Beleza, Tecnologia, Casa) o achadinho aparece.' ),
		'link'         => array( 'Link de afiliado', 'url', 'Para onde o botão "Ver na loja" leva.' ),
		'preco_antigo' => array( 'Preço antigo (R$)', 'number', 'Ex.: 149.90' ),
		'preco_atual'  => array( 'Preço atual (R$)', 'number', 'Ex.: 89.90' ),
		'desconto'     => array( 'Desconto (%)', 'number', 'Opcional. Se vazio, é calculado pelos preços.' ),
		'parcelamento' => array( 'Parcelamento', 'text', 'Ex.: em até 3x de R$ 29,97 sem juros' ),
		'cupom'        => array( 'Cupom', 'text', 'Opcional. Ex.: KNOVA10' ),
		'destaque'     => array( 'Mostrar em "Ofertas que valem a pena"', 'checkbox', 'A seção mostra até 4 achadinhos marcados aqui (pela ordem).' ),
		'selo'         => array( 'Selo da oferta', 'text', 'Ex.: MAIS PROCURADO, OFERTA RELÂMPAGO. Se vazio, usa um selo padrão.' ),
		'etiqueta'     => array( 'Etiqueta do achadinho', 'text', 'Ex.: NO RADAR, FUI TESTAR. Se vazio, usa uma etiqueta padrão.' ),
		'destaques'    => array( 'Por que eu amei (um item por linha)', 'textarea', 'Aparece na janela de detalhes do achadinho.' ),
	);
}

function knova_registrar_produtos() {
	register_post_type(
		'knova_produto',
		array(
			'labels'        => array(
				'name'               => 'Achadinhos',
				'singular_name'      => 'Achadinho',
				'add_new'            => 'Adicionar achadinho',
				'add_new_item'       => 'Adicionar novo achadinho',
				'edit_item'          => 'Editar achadinho',
				'new_item'           => 'Novo achadinho',
				'view_item'          => 'Ver achadinho',
				'search_items'       => 'Buscar achadinhos',
				'not_found'          => 'Nenhum achadinho encontrado',
				'not_found_in_trash' => 'Nenhum achadinho na lixeira',
				'all_items'          => 'Todos os achadinhos',
				'menu_name'          => 'Achadinhos',
				'featured_image'     => 'Foto do produto',
				'set_featured_image' => 'Definir foto do produto',
			),
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => true,
			'menu_position' => 5,
			'menu_icon'     => 'dashicons-heart',
			'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
		)
	);
}
add_action( 'init', 'knova_registrar_produtos' );

function knova_meta_boxes() {
	add_meta_box( 'knova_produto_dados', 'Dados do achadinho', 'knova_meta_box_html', 'knova_produto', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'knova_meta_boxes' );

function knova_meta_box_html( $post ) {
	wp_nonce_field( 'knova_produto_salvar', 'knova_produto_nonce' );
	echo '<table class="form-table" role="presentation"><tbody>';

	foreach ( knova_campos_produto() as $chave => $campo ) {
		list( $rotulo, $tipo, $ajuda ) = $campo;
		$id    = 'knova_' . $chave;
		$valor = get_post_meta( $post->ID, '_knova_' . $chave, true );

		echo '<tr><th scope="row"><label for="' . esc_attr( $id ) . '">' . esc_html( $rotulo ) . '</label></th><td>';

		switch ( $tipo ) {
			case 'loja':
			case 'categoria':
				$opcoes = 'loja' === $tipo ? knova_lojas_produto() : knova_categorias_produto();
				echo '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '">';
				foreach ( $opcoes as $valor_opcao => $nome ) {
					echo '<option value="' . esc_attr( $valor_opcao ) . '"' . selected( $valor, $valor_opcao, false ) . '>' . esc_html( $nome ) . '</option>';
				}
				echo '</select>';
				break;
			case 'checkbox':
				echo '<label><input type="checkbox" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="1"' . checked( $valor, '1', false ) . ' /> Sim</label>';
				break;
			case 'textarea':
				echo '<textarea class="large-text" rows="4" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '">' . esc_textarea( $valor ) . '</textarea>';
				break;
			case 'number':
				echo '<input type="number" step="0.01" min="0" class="small-text" style="width:8em" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="' . esc_attr( $valor ) . '" />';
				break;
			default:
				echo '<input type="' . ( 'url' === $tipo ? 'url' : 'text' ) . '" class="regular-text" id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" value="' . esc_attr( $valor ) . '" />';
		}

		if ( $ajuda ) {
			echo '<p class="description">' . esc_html( $ajuda ) . '</p>';
		}
		echo '</td></tr>';
	}

	echo '</tbody></table>';
	echo '<p class="description">A foto do produto é a <strong>imagem destacada</strong> (caixa na lateral). A ordem de exibição segue o campo <strong>Ordem</strong> em "Atributos" (menor aparece primeiro).</p>';
}

function knova_salvar_produto( $post_id ) {
	if ( ! isset( $_POST['knova_produto_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['knova_produto_nonce'] ) ), 'knova_produto_salvar' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( knova_campos_produto() as $chave => $campo ) {
		$tipo  = $campo[1];
		$nome  = 'knova_' . $chave;
		$bruto = isset( $_POST[ $nome ] ) ? wp_unslash( $_POST[ $nome ] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized

		switch ( $tipo ) {
			case 'url':
				$valor = esc_url_raw( $bruto );
				break;
			case 'textarea':
				$valor = sanitize_textarea_field( $bruto );
				break;
			case 'checkbox':
				$valor = $bruto ? '1' : '';
				break;
			case 'number':
				$valor = '' === trim( $bruto ) ? '' : (string) (float) str_replace( ',', '.', $bruto );
				break;
			case 'loja':
				$valor = array_key_exists( $bruto, knova_lojas_produto() ) ? $bruto : 'outra';
				break;
			case 'categoria':
				$valor = array_key_exists( $bruto, knova_categorias_produto() ) ? $bruto : 'outros';
				break;
			default:
				$valor = sanitize_text_field( $bruto );
		}

		update_post_meta( $post_id, '_knova_' . $chave, $valor );
	}
}
add_action( 'save_post_knova_produto', 'knova_salvar_produto' );

/**
 * Colunas da lista de achadinhos no painel.
 */
function knova_colunas_produto( $colunas ) {
	$novas = array();
	foreach ( $colunas as $chave => $nome ) {
		if ( 'title' === $chave ) {
			$novas['knova_foto'] = 'Foto';
		}
		$novas[ $chave ] = $nome;
		if ( 'title' === $chave ) {
			$novas['knova_loja']     = 'Loja';
			$novas['knova_preco']    = 'Preço';
			$novas['knova_destaque'] = 'Em Ofertas';
		}
	}
	return $novas;
}
add_filter( 'manage_knova_produto_posts_columns', 'knova_colunas_produto' );

function knova_coluna_produto_valor( $coluna, $post_id ) {
	$produto = knova_produto( $post_id );
	switch ( $coluna ) {
		case 'knova_foto':
			if ( $produto['imagem'] ) {
				echo '<img src="' . esc_url( $produto['imagem'] ) . '" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:6px" />';
			}
			break;
		case 'knova_loja':
			echo esc_html( $produto['loja_nome'] );
			break;
		case 'knova_preco':
			echo esc_html( knova_money( $produto['preco_atual'] ) );
			break;
		case 'knova_destaque':
			echo $produto['destaque'] ? '✔' : '—';
			break;
	}
}
add_action( 'manage_knova_produto_posts_custom_column', 'knova_coluna_produto_valor', 10, 2 );

/**
 * Mostra os achadinhos no painel pela mesma ordem do site.
 */
function knova_ordem_admin( $query ) {
	if ( is_admin() && $query->is_main_query() && 'knova_produto' === $query->get( 'post_type' ) && ! $query->get( 'orderby' ) ) {
		$query->set( 'orderby', array( 'menu_order' => 'ASC', 'date' => 'DESC' ) );
	}
}
add_action( 'pre_get_posts', 'knova_ordem_admin' );

/**
 * Dados de um achadinho prontos para o template.
 */
function knova_produto( $post_id ) {
	$meta = function ( $chave ) use ( $post_id ) {
		return get_post_meta( $post_id, '_knova_' . $chave, true );
	};

	$lojas      = knova_lojas_produto();
	$categorias = knova_categorias_produto();
	$loja       = $meta( 'loja' ) ? $meta( 'loja' ) : 'outra';
	$categoria  = $meta( 'categoria' ) ? $meta( 'categoria' ) : 'outros';

	$preco_antigo = $meta( 'preco_antigo' );
	$preco_atual  = $meta( 'preco_atual' );
	$desconto     = $meta( 'desconto' );
	if ( '' === $desconto && (float) $preco_antigo > 0 && (float) $preco_atual > 0 && (float) $preco_atual < (float) $preco_antigo ) {
		$desconto = round( ( 1 - (float) $preco_atual / (float) $preco_antigo ) * 100 );
	}

	$loja_nome = $meta( 'loja_nome' );
	if ( ! $loja_nome ) {
		$loja_nome = 'outra' === $loja ? 'loja' : $lojas[ $loja ];
	}

	$destaques = array_values( array_filter( array_map( 'trim', explode( "\n", (string) $meta( 'destaques' ) ) ) ) );

	return array(
		'id'              => $post_id,
		'titulo'          => get_the_title( $post_id ),
		'descricao'       => $meta( 'descricao' ),
		'imagem'          => get_the_post_thumbnail_url( $post_id, 'large' ),
		'loja'            => $loja,
		'loja_nome'       => $loja_nome,
		'categoria'       => $categoria,
		'categoria_nome'  => isset( $categorias[ $categoria ] ) ? $categorias[ $categoria ] : '',
		'link'            => $meta( 'link' ),
		'preco_antigo'    => $preco_antigo,
		'preco_atual'     => $preco_atual,
		'desconto'        => '' === $desconto ? '' : (int) $desconto,
		'parcelamento'    => $meta( 'parcelamento' ),
		'cupom'           => $meta( 'cupom' ),
		'destaque'        => '1' === $meta( 'destaque' ),
		'selo'            => $meta( 'selo' ),
		'etiqueta'        => $meta( 'etiqueta' ),
		'destaques'       => $destaques,
	);
}

function knova_produtos( $somente_destaque = false, $limite = -1 ) {
	$args = array(
		'post_type'      => 'knova_produto',
		'post_status'    => 'publish',
		'posts_per_page' => $limite,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
		'fields'         => 'ids',
		'no_found_rows'  => true,
	);
	if ( $somente_destaque ) {
		$args['meta_key']   = '_knova_destaque'; // phpcs:ignore WordPress.DB.SlowDBQuery
		$args['meta_value'] = '1'; // phpcs:ignore WordPress.DB.SlowDBQuery
	}
	return array_map( 'knova_produto', get_posts( $args ) );
}

/**
 * Dados usados pela janela de detalhes (JavaScript).
 */
function knova_produto_json( $produto ) {
	return wp_json_encode(
		array(
			'titulo'       => $produto['titulo'],
			'descricao'    => $produto['descricao'],
			'imagem'       => $produto['imagem'],
			'loja'         => $produto['loja_nome'],
			'categoria'    => $produto['categoria_nome'],
			'link'         => $produto['link'],
			'precoAntigo'  => knova_money( $produto['preco_antigo'] ),
			'precoAtual'   => knova_money( $produto['preco_atual'] ),
			'desconto'     => $produto['desconto'],
			'parcelamento' => $produto['parcelamento'],
			'cupom'        => $produto['cupom'],
			'destaques'    => $produto['destaques'],
		)
	);
}
