<template lang="pug">
  .loading
    .loading-point
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
.loading {
  width: 100vw;
  min-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-point {
  display: block;
  width: 1em;
  height: 1em;
  color: #DBAC94;
  pointer-events: none;
  border-radius: 50%;
  box-shadow: 0 1em 0 -0.2em currentcolor;
  position: relative;
  -webkit-animation: loading 0.8s ease-in-out alternate infinite;
  animation: loading 0.8s ease-in-out alternate infinite;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
  top: -1em;
}
.loading-point:after,
.loading-point:before {
  content: "";
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  box-shadow: inherit;
  -webkit-animation: inherit;
  animation: inherit;
}
.loading-point:before {
  left: -1em;
  -webkit-animation-delay: 0.48s;
  animation-delay: 0.48s;
}
.loading-point:after {
  right: -1em;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
@-webkit-keyframes loading {
  0% {
    box-shadow: 0 2em 0 -0.2em currentcolor;
  }
  100% {
    box-shadow: 0 1em 0 -0.2em currentcolor;
  }
}
@keyframes loading {
  0% {
    box-shadow: 0 2em 0 -0.2em currentcolor;
  }
  100% {
    box-shadow: 0 1em 0 -0.2em currentcolor;
  }
}
</style>
