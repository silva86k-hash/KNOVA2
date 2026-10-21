<?php
/**
 * Rodapé do site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$knova_email = knova_mod( 'contato_email' );
?>
	<footer class="site-footer section-rail">
		<div class="footer-top">
			<?php knova_brand( 'Achadinhos Knova' ); ?>

			<div class="footer-socials">
				<?php foreach ( knova_socials() as $knova_rede ) : ?>
					<a href="<?php echo esc_url( $knova_rede['url'] ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo knova_social_icon( $knova_rede, 'w-4 h-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span><?php echo esc_html( $knova_rede['nome'] ); ?></span>
						<?php echo knova_icon( 'arrow-up-right', 'w-3.5 h-3.5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<?php if ( $knova_email ) : ?>
			<div class="contact-email">
				<?php echo knova_icon( 'mail', 'w-4 h-4 stroke-[2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
				<span>Contato:</span>
				<a href="<?php echo esc_url( 'mailto:' . $knova_email ); ?>"><?php echo esc_html( $knova_email ); ?></a>
			</div>
		<?php endif; ?>

		<div class="affiliate-disclosure">
			<strong><?php echo esc_html( knova_mod( 'rodape_transparencia_titulo' ) ); ?></strong>
			<p><?php echo knova_lines( knova_mod( 'rodape_transparencia' ) ); // phpcs:ignore WordPress.Security.EscapeOutput ?></p>
		</div>

		<div class="footer-bottom">
			<span>© <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php echo esc_html( knova_mod( 'rodape_copyright' ) ); ?></span>
			<span><?php echo esc_html( knova_mod( 'rodape_frase' ) ); ?></span>
		</div>
	</footer>
</div>

<div class="knova-modal" id="knova-modal" hidden>
	<div class="knova-modal__fundo" data-knova-fechar></div>
	<div class="knova-modal__caixa" role="dialog" aria-modal="true" aria-labelledby="knova-modal-titulo">
		<button type="button" class="knova-modal__fechar" aria-label="Fechar" data-knova-fechar><?php echo knova_icon( 'x', 'w-5 h-5' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></button>
		<div class="knova-modal__imagem"><img src="" alt="" data-knova-campo="imagem" /></div>
		<div class="knova-modal__corpo">
			<div class="product-meta"><span data-knova-campo="categoria"></span><span data-knova-campo="loja"></span></div>
			<h3 id="knova-modal-titulo" data-knova-campo="titulo"></h3>
			<p class="knova-modal__descricao" data-knova-campo="descricao"></p>
			<div class="knova-modal__precos">
				<span class="offer-price" data-knova-campo="precoAtual"></span>
				<span class="offer-old" data-knova-campo="precoAntigo"></span>
				<span class="knova-modal__desconto" data-knova-campo="desconto"></span>
			</div>
			<p class="knova-modal__parcelas" data-knova-campo="parcelamento"></p>
			<div class="knova-modal__cupom" data-knova-bloco="cupom">
				<span>Cupom:</span>
				<strong data-knova-campo="cupom"></strong>
				<button type="button" data-knova-copiar>Copiar</button>
			</div>
			<div data-knova-bloco="destaques">
				<strong class="knova-modal__subtitulo">Por que eu amei</strong>
				<ul class="knova-modal__lista" data-knova-campo="destaques"></ul>
			</div>
			<a class="button button-black knova-modal__botao" href="#" target="_blank" rel="noopener noreferrer" data-knova-campo="link">
				<span></span>
				<?php echo knova_icon( 'arrow-up-right', 'w-5 h-5 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</a>
			<p class="knova-modal__aviso">Preço e disponibilidade podem mudar. Confira o valor final direto na loja.</p>
		</div>
	</div>
</div>

<?php wp_footer(); ?>
</body>
</html>
