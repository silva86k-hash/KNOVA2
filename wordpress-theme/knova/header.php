<?php
/**
 * Cabeçalho do site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$knova_ancora = is_front_page() ? '' : home_url( '/' );
$knova_links  = array(
	'#ofertas'    => 'Ofertas',
	'#achadinhos' => 'Achadinhos',
	'#lojas'      => 'Onde garimpar',
	'#comunidade' => 'Comunidade',
	'#sobre'      => 'A Knova',
);
$knova_instagram = knova_mod( 'rede_instagram_url' );
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-[#FFF8FA] text-[#000000] antialiased selection:bg-[#FF4D8D] selection:text-white' ); ?>>
<?php wp_body_open(); ?>
<div class="min-h-screen bg-white flex flex-col text-black antialiased selection:bg-[#ff4d8d] selection:text-white">
	<header class="site-header">
		<div class="header-inner">
			<?php knova_brand( 'Achadinhos Knova, início' ); ?>

			<nav class="nav-links hidden md:flex" aria-label="Navegação principal">
				<?php foreach ( $knova_links as $knova_href => $knova_rotulo ) : ?>
					<a href="<?php echo esc_url( $knova_ancora . $knova_href ); ?>"><?php echo esc_html( $knova_rotulo ); ?></a>
				<?php endforeach; ?>
			</nav>

			<div class="flex items-center gap-3">
				<?php if ( $knova_instagram ) : ?>
					<a class="header-instagram hidden sm:flex" href="<?php echo esc_url( $knova_instagram ); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo knova_icon( 'instagram', 'w-4 h-4 text-[#d92869]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span>Vem pro Instagram</span>
						<?php echo knova_icon( 'arrow-up-right', 'w-4 h-4' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
				<?php endif; ?>

				<?php if ( current_user_can( 'edit_posts' ) ) : ?>
					<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=knova_produto' ) ); ?>" class="p-2 rounded-lg border-[1.5px] border-black bg-[#ffd93b] hover:bg-[#ffe26b] text-black text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000] transition-transform hover:-translate-y-0.5" title="Gerenciar achadinhos no painel">
						<?php echo knova_icon( 'tag', 'w-4 h-4 stroke-[2.2]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span class="hidden lg:inline">Gerenciar</span>
					</a>
				<?php endif; ?>

				<button class="menu-toggle md:hidden p-2 rounded-lg border border-slate-300" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="knova-menu-mobile" data-knova-menu-toggle>
					<span data-knova-icon-abrir><?php echo knova_icon( 'menu', 'w-6 h-6' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
					<span data-knova-icon-fechar hidden><?php echo knova_icon( 'x', 'w-6 h-6' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
				</button>
			</div>
		</div>

		<div id="knova-menu-mobile" class="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3 font-semibold text-sm" hidden>
			<?php foreach ( $knova_links as $knova_href => $knova_rotulo ) : ?>
				<a href="<?php echo esc_url( $knova_ancora . $knova_href ); ?>" class="block py-1 hover:text-[#d92869]" data-knova-menu-link><?php echo esc_html( $knova_rotulo ); ?></a>
			<?php endforeach; ?>
			<?php if ( $knova_instagram ) : ?>
				<div class="pt-2 border-t border-slate-100 flex items-center justify-between">
					<a href="<?php echo esc_url( $knova_instagram ); ?>" target="_blank" rel="noopener noreferrer" class="header-instagram flex items-center gap-2 text-xs font-bold">
						<?php echo knova_icon( 'instagram', 'w-4 h-4 text-[#d92869]' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
						<span><?php echo esc_html( knova_mod( 'rede_instagram_handle' ) ); ?></span>
					</a>
				</div>
			<?php endif; ?>
		</div>
	</header>
