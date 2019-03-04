<template>
  <svg class="svg-icon" aria-hidden="true">
    <title v-if="title" v-text="title"></title>
    <use :xlink:href="`#icon-${this.icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    vertical-align: -0.15em;
  }
</style>