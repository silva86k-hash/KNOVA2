<?php
/**
 * Página inicial.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$knova_ofertas = knova_produtos( true, 4 );
if ( ! $knova_ofertas ) {
	$knova_ofertas = knova_produtos( false, 4 );
}
$knova_achadinhos = knova_produtos();

$knova_selos     = array( 'MAIS PROCURADO', 'OFERTA RELÂMPAGO', 'QUERIDINHO', 'DESTAQUE' );
$knova_etiquetas = array( 'NO RADAR', 'FUI TESTAR', 'DICA DE AMIGA', 'SUPER ACHADO' );
$knova_instagram = knova_mod( 'rede_instagram_url' );
?>

<main class="flex-1">
	<section class="hero">
		<div class="hero-inner">
			<div class="hero-copy">
				<div class="yellow-note">
					<?php echo knova_icon( 'sparkles', 'w-4 h-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span><?php echo esc_html( knova_mod( 'hero_nota' ) ); ?></span>
				</div>

				<h1>
					<?php
					// O sublinhado desenhado acompanha o trecho destacado.
					echo str_replace( // phpcs:ignore WordPress.Security.EscapeOutput
						'</span>',
						'<svg viewBox="0 0 370 25" aria-hidden="true"><path d="M8 19 Q160 -1 358 14" /></svg></span>',
						knova_title( knova_mod( 'hero_titulo' ) )
					);
					?>
				</h1>

				<p><?php echo knova_lines( knova_mod( 'hero_texto' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>

				<a class="button button-black" href="#achadinhos">
					<span><?php echo esc_html( knova_mod( 'hero_botao' ) ); ?></span>
					<?php echo knova_icon( 'arrow-down', 'w-5 h-5 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>

				<a class="hero-social" href="<?php echo esc_url( $knova_instagram ? $knova_instagram : '#comunidade' ); ?>" target="_blank" rel="noopener noreferrer">
					<span><?php echo esc_html( knova_mod( 'hero_social' ) ); ?></span>
					<?php echo knova_icon( 'heart', 'w-4 h-4 fill-[#c21a55] text-[#c21a55]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>
			</div>

			<div class="hero-art">
				<div class="art-frame">
					<img src="<?php echo esc_url( knova_mod( 'hero_imagem' ) ); ?>" alt="<?php echo esc_attr( knova_mod( 'hero_imagem_alt' ) ); ?>" class="w-full h-auto object-cover rounded-[9px]" loading="eager" />
				</div>

				<div class="gingham-tape" aria-hidden="true"></div>

				<div class="art-label">
					<?php echo esc_html( knova_mod( 'hero_etiqueta' ) ); ?>
					<br />
					<strong><?php echo esc_html( knova_mod( 'hero_etiqueta_forte' ) ); ?></strong>
				</div>

				<?php echo knova_icon( 'heart', 'hero-heart' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>

				<a class="art-handle" href="<?php echo esc_url( $knova_instagram ? $knova_instagram : '#comunidade' ); ?>" target="_blank" rel="noopener noreferrer">
					<span><?php echo esc_html( knova_mod( 'hero_handle' ) ); ?></span>
					<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4 stroke-[2.5]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				</a>
			</div>
		</div>
	</section>

	<?php if ( $knova_ofertas ) : ?>
		<section id="ofertas" class="offers section-rail">
			<div class="section-top">
				<div>
					<span class="eyebrow">
						<?php echo knova_icon( 'tag', 'w-4 h-4 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span><?php echo esc_html( knova_mod( 'ofertas_eyebrow' ) ); ?></span>
					</span>
					<h2><?php echo knova_title( knova_mod( 'ofertas_titulo' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></h2>
				</div>
				<p><?php echo knova_lines( knova_mod( 'ofertas_texto' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
			</div>

			<div class="offer-grid">
				<?php foreach ( $knova_ofertas as $knova_i => $knova_p ) : ?>
					<article class="offer-card" data-knova-produto="<?php echo esc_attr( knova_produto_json( $knova_p ) ); ?>">
						<div class="offer-image cursor-pointer" data-knova-abrir>
							<span class="offer-badge"><?php echo esc_html( $knova_p['selo'] ? $knova_p['selo'] : $knova_selos[ $knova_i % count( $knova_selos ) ] ); ?></span>
							<?php if ( '' !== $knova_p['desconto'] ) : ?>
								<span class="offer-discount">-<?php echo esc_html( $knova_p['desconto'] ); ?>%</span>
							<?php endif; ?>
							<?php if ( $knova_p['imagem'] ) : ?>
								<img loading="lazy" src="<?php echo esc_url( $knova_p['imagem'] ); ?>" alt="<?php echo esc_attr( $knova_p['titulo'] . ' — imagem ilustrativa' ); ?>" />
							<?php endif; ?>
							<span class="illustration-label">Imagem ilustrativa</span>
						</div>

						<div class="offer-body">
							<div class="product-meta">
								<span><?php echo esc_html( $knova_p['categoria_nome'] ); ?></span>
								<span><?php echo esc_html( $knova_p['loja_nome'] ); ?></span>
							</div>

							<h3 class="cursor-pointer hover:text-[#d92869] transition-colors" title="<?php echo esc_attr( $knova_p['titulo'] ); ?>" data-knova-abrir><?php echo esc_html( $knova_p['titulo'] ); ?></h3>

							<div class="offer-prices">
								<span class="offer-price"><?php echo esc_html( knova_money( $knova_p['preco_atual'] ) ); ?></span>
								<span class="offer-old"><?php echo esc_html( knova_money( $knova_p['preco_antigo'] ) ); ?></span>
							</div>

							<?php if ( $knova_p['link'] ) : ?>
								<a class="product-link" href="<?php echo esc_url( $knova_p['link'] ); ?>" target="_blank" rel="noopener noreferrer sponsored">
									<span>Aproveitar na <?php echo esc_html( $knova_p['loja_nome'] ); ?></span>
									<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4 stroke-[2.5]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
								</a>
							<?php endif; ?>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</section>
	<?php endif; ?>

	<section id="achadinhos" class="discovery section-rail">
		<div class="section-top">
			<div>
				<span class="eyebrow">
					<?php echo knova_icon( 'sparkles', 'w-4 h-4 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<span><?php echo esc_html( knova_mod( 'achadinhos_eyebrow' ) ); ?></span>
				</span>
				<h2><?php echo knova_title( knova_mod( 'achadinhos_titulo' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></h2>
			</div>
			<p><?php echo knova_lines( knova_mod( 'achadinhos_texto' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
		</div>

		<div class="filter-bar">
			<div class="category-filters">
				<button type="button" class="selected" data-knova-categoria="todas">Todos</button>
				<?php foreach ( knova_categorias_produto() as $knova_cat => $knova_cat_nome ) : ?>
					<?php
					if ( 'outros' === $knova_cat ) {
						continue;
					}
					?>
					<button type="button" data-knova-categoria="<?php echo esc_attr( $knova_cat ); ?>"><?php echo esc_html( $knova_cat_nome ); ?></button>
				<?php endforeach; ?>
			</div>

			<div class="store-select">
				<select aria-label="Filtrar por loja parceira" data-knova-loja>
					<option value="todas">Todas as lojas</option>
					<?php foreach ( knova_lojas_produto() as $knova_loja => $knova_loja_nome ) : ?>
						<?php
						if ( 'outra' === $knova_loja ) {
							continue;
						}
						?>
						<option value="<?php echo esc_attr( $knova_loja ); ?>"><?php echo esc_html( $knova_loja_nome ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>

			<div class="search-box">
				<?php echo knova_icon( 'search', 'w-3.5 h-3.5 shrink-0' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<input type="text" placeholder="Buscar achadinho..." aria-label="Buscar achadinho" data-knova-busca />
			</div>
		</div>

		<div class="product-grid" data-knova-grade <?php echo $knova_achadinhos ? '' : 'hidden'; ?>>
			<?php foreach ( $knova_achadinhos as $knova_i => $knova_p ) : ?>
				<?php
				$knova_busca = implode( ' ', array( $knova_p['titulo'], $knova_p['loja_nome'], $knova_p['categoria_nome'], $knova_p['descricao'] ) );
				?>
				<article class="product-card" data-knova-produto="<?php echo esc_attr( knova_produto_json( $knova_p ) ); ?>" data-categoria="<?php echo esc_attr( $knova_p['categoria'] ); ?>" data-loja="<?php echo esc_attr( $knova_p['loja'] ); ?>" data-busca="<?php echo esc_attr( $knova_busca ); ?>">
					<div class="product-image cursor-pointer" data-knova-abrir>
						<span class="product-tag"><?php echo esc_html( $knova_p['etiqueta'] ? $knova_p['etiqueta'] : $knova_etiquetas[ $knova_i % count( $knova_etiquetas ) ] ); ?></span>
						<?php if ( $knova_p['imagem'] ) : ?>
							<img loading="lazy" src="<?php echo esc_url( $knova_p['imagem'] ); ?>" alt="<?php echo esc_attr( $knova_p['titulo'] . ' — imagem ilustrativa' ); ?>" />
						<?php endif; ?>
						<span class="illustration-label">Imagem ilustrativa</span>
					</div>

					<div class="product-body">
						<div class="product-meta">
							<span><?php echo esc_html( $knova_p['categoria_nome'] ); ?></span>
							<span><?php echo esc_html( $knova_p['loja_nome'] ); ?></span>
						</div>

						<h3 class="cursor-pointer hover:text-[#d92869] transition-colors" data-knova-abrir><?php echo esc_html( $knova_p['titulo'] ); ?></h3>

						<p><?php echo esc_html( $knova_p['descricao'] ? $knova_p['descricao'] : 'Uma inspiração para o seu dia a dia.' ); ?></p>

						<?php if ( $knova_p['link'] ) : ?>
							<a class="product-link" href="<?php echo esc_url( $knova_p['link'] ); ?>" target="_blank" rel="noopener noreferrer sponsored">
								<span>Ver na <?php echo esc_html( $knova_p['loja_nome'] ); ?></span>
								<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4 stroke-[2.5]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
							</a>
						<?php endif; ?>
					</div>
				</article>
			<?php endforeach; ?>
		</div>

		<div class="empty-results text-center py-12 space-y-3 bg-[#fff8fb] rounded-xl border border-[#f3d9e4]" data-knova-vazio <?php echo $knova_achadinhos ? 'hidden' : ''; ?>>
			<p class="text-sm font-bold text-slate-800">Nenhum achadinho encontrado para esta busca.</p>
			<button type="button" class="button button-black text-xs py-2 px-4" data-knova-limpar>
				<span>Ver todos os achadinhos</span>
			</button>
		</div>

		<p class="example-note"><?php echo esc_html( knova_mod( 'achadinhos_nota' ) ); ?></p>
	</section>

	<section id="lojas" class="marketplaces section-rail">
		<div class="market-heading">
			<span class="eyebrow">
				<?php echo knova_icon( 'shopping-bag', 'w-4 h-4 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<span><?php echo esc_html( knova_mod( 'lojas_eyebrow' ) ); ?></span>
			</span>
			<h2><?php echo knova_title( knova_mod( 'lojas_titulo' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></h2>
			<p><?php echo knova_lines( knova_mod( 'lojas_texto' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
		</div>

		<div class="store-grid">
			<?php foreach ( knova_lojas() as $knova_loja ) : ?>
				<a class="store-tile <?php echo esc_attr( $knova_loja['classe'] ); ?>" href="<?php echo esc_url( $knova_loja['url'] ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo knova_icon( 'shopping-bag', 'w-5 h-5 text-black stroke-[2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					<strong><?php echo esc_html( $knova_loja['nome'] ); ?></strong>
					<span><?php echo esc_html( $knova_loja['desc'] ); ?></span>
					<div>
						<span>Explorar loja</span>
						<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4 stroke-[2.5]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</div>
				</a>
			<?php endforeach; ?>
		</div>

		<p class="destination-note"><?php echo esc_html( knova_mod( 'lojas_nota' ) ); ?></p>
	</section>

	<section id="sobre" class="about section-rail">
		<div class="about-title">
			<span class="eyebrow"><?php echo esc_html( knova_mod( 'sobre_eyebrow' ) ); ?></span>
			<h2>
				<?php echo knova_title( knova_mod( 'sobre_titulo' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<?php echo knova_icon( 'heart', 'w-9 h-9 fill-[#00cdba] text-[#00cdba]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</h2>
		</div>

		<div class="about-copy">
			<?php foreach ( array( 'sobre_texto_1', 'sobre_texto_2' ) as $knova_chave ) : ?>
				<?php if ( knova_mod( $knova_chave ) ) : ?>
					<p><?php echo knova_lines( knova_mod( $knova_chave ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
				<?php endif; ?>
			<?php endforeach; ?>

			<div class="how-it-works">
				<?php foreach ( array_filter( array_map( 'trim', explode( "\n", knova_mod( 'sobre_itens' ) ) ) ) as $knova_item ) : ?>
					<span>
						<?php echo knova_icon( 'circle-check', 'w-3.5 h-3.5 stroke-[2.5]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span><?php echo esc_html( $knova_item ); ?></span>
					</span>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section id="comunidade" class="community">
		<div class="community-inner">
			<div class="community-note"><?php echo esc_html( knova_mod( 'comunidade_nota' ) ); ?></div>

			<h2><?php echo knova_title( knova_mod( 'comunidade_titulo' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></h2>

			<p><?php echo knova_lines( knova_mod( 'comunidade_texto' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>

			<div class="social-grid">
				<?php foreach ( knova_socials() as $knova_rede ) : ?>
					<a class="social-tile <?php echo esc_attr( $knova_rede['classe'] ); ?>" href="<?php echo esc_url( $knova_rede['url'] ); ?>" target="_blank" rel="noopener noreferrer">
						<span class="social-icon"><?php echo knova_social_icon( $knova_rede, 'w-5 h-5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
						<span class="social-name"><?php echo esc_html( $knova_rede['nome'] ); ?></span>
						<span class="social-handle"><?php echo esc_html( $knova_rede['handle'] ); ?></span>
						<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4 social-arrow' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<?php echo knova_icon( 'heart', 'community-heart' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</section>
</main>

<?php
get_footer();
