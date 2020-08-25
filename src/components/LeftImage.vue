<template>
  <div
    :style="{height: 'inherit',
    backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: 'url('
    +this.img[currentSetting] + ')'}"></div>
</template>

<script>
  export default {
    name: 'LeftImage',
    props: {
      img: Object,
      currentSetting: String
    },
  };
</script>
