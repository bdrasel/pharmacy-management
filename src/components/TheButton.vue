<template>
  <div
    class="the-button"
    :class="{
      'the-button--block': block,
      'the-button--gray': color === 'gray',
    }"
  >
    <button>
      <slot></slot>
    </button>
    <div class="the-button__loading" v-if="loading">
      <!-- <img src="/img/spinner.gif" alt="" /> -->
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "none",
    },
  },
};
</script>

<style>
.the-button {
  position: relative;
  display: inline-block;
}

.the-button button {
  padding: 9px 22px;
  font-size: 15px;
  background-color: #0a4219;
  border: 1px solid #0a4219;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 2px 1px #afafaf;
  border-radius: 3px;
}

.the-button button:hover {
  color: #ffdac8;
  background: #000;
  box-shadow: 0 2px 3px 2px #afafaf;
}

.the-button--block {
  width: 100%;
}

.the-button__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #0a4219;
}

.the-button button {
  width: 100%;
}

.the-button__loading img {
  width: 25px;
}

.the-button--gray button {
  background-color: #707070;
  border-color: #707070;
}

.the-button--gray button:hover {
  background-color: #4d4d4d;
  border-color: #4d4d4d;
}
</style>
