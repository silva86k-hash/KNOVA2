<?php
/**
 * Páginas, posts e demais listagens (fora da página inicial).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main class="flex-1">
	<div class="knova-conteudo section-rail">
		<?php if ( have_posts() ) : ?>
			<?php if ( ! is_singular() ) : ?>
				<h1 class="knova-conteudo__titulo"><?php echo wp_kses_post( get_the_archive_title() ? get_the_archive_title() : get_bloginfo( 'name' ) ); ?></h1>
			<?php endif; ?>

			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'knova-artigo' ); ?>>
					<?php if ( is_singular() ) : ?>
						<h1 class="knova-conteudo__titulo"><?php the_title(); ?></h1>
						<div class="knova-texto"><?php the_content(); ?></div>
					<?php else : ?>
						<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<div class="knova-texto"><?php the_excerpt(); ?></div>
					<?php endif; ?>
				</article>
			<?php endwhile; ?>

			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<h1 class="knova-conteudo__titulo">Página não encontrada</h1>
			<p class="knova-texto">O que você procura não está aqui. <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Voltar para os achadinhos</a>.</p>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
