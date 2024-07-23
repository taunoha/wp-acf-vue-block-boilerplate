<?php

defined('ABSPATH') or die();

function {prefix}_register_acf_blocks()
{
  register_block_type(__DIR__ . '/{path-to-block-folder}');
}
add_action('init', '{prefix}_register_acf_blocks');

function {prefix}_register_layout_category($categories)
{
  return array_merge(array(array(
    'slug'  => '{prefix}',
    'title' => '{category}'
  )), $categories);
}
add_filter('block_categories_all', '{prefix}_register_layout_category');
