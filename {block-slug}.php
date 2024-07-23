<?php

/**
 * {block-name}
 * 
 * @doc https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/
 * 
 * @param array $block The block settings and attributes.
 *
 */
defined('ABSPATH') or die();

$classes = array('{domain}-{block-slug}');

if ($is_preview) {
  $classes[] = 'is-preview';
}

wp_interactivity_config('{domain}/{block-slug}', array(
  'translations' => require(__DIR__ . '/languages/messages.php'),
));

?>
<figure v-cloak <?php echo get_block_wrapper_attributes(array('id' => "{domain}-{block-slug}", 'class' => esc_attr(implode(' ', $classes)))); ?>>
  <?php if ($is_preview) : ?>
    <div class="wp-block-group">
      <p class="text-center">
        <div><strong>This section's content is visible only on the front end.</strong></div>
        <em>However, you can click here to view additional section options</em>
      </p>
    </div>
  <?php endif; ?>
</figure>
