<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  @font-face {
    font-family: 'Gotham Pro';
    src: url("./assets/fonts/subset-GothamPro.woff2") format("woff2"),
    url("./assets/fonts/subset-GothamPro.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gotham Pro';
    src: url("./assets/fonts/subset-GothamPro-Medium.woff2") format("woff2"),
    url("./assets/fonts/subset-GothamPro-Medium.woff") format("woff");
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Glyphicons Halflings';
    font-display:swap;
    src: url('./assets/fonts/glyphicons-halflings-regular.eot');
    src: url('./assets/fonts/glyphicons-halflings-regular.eot?#iefix') format("embedded-opentype"),
    url('./assets/fonts/glyphicons-halflings-regular.woff2') format("woff2"),
    url('./assets/fonts/glyphicons-halflings-regular.woff') format("woff"),
    url('./assets/fonts/glyphicons-halflings-regular.ttf') format("truetype"),
    url('./assets/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format("svg")
  }

  #app  * {
    font-family: 'Gotham Pro', sans-serif;
    box-sizing: border-box;
  }
  #app {

    height: 100%;
    margin: 0 auto;
  }
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    list-style-type: none;
  }
  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }
  input {
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    text-align: center;
    -moz-appearance: textfield;
  }
  .optionItem {
    position: relative;
    z-index: 0;
  }

  .optionItem__checkbox {
    position: absolute;
    opacity: 0;
    z-index: 10;
  }

  .optionLabel {
    display: flex;
    cursor: pointer;
  }

  .optionLabel__field {
    display: flex;
    width: 18px;
    height: 18px;
    padding: 3px;
    margin-right: 8px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
  }

  .optionLabel__text {
    font-weight: bold;
    font-size: 0.875rem;
  }

  .optionItem__checkbox:checked + .optionItem__label .optionLabel__field {
    background-color: #E1BD0C;
  }

  .optionLabel__svg {
    width: 100%;
    height: 100%;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    font-size: 1rem;
    font-weight: bold;
    color: #343434;
    outline: none!important;
    background-color: #e1bd0c;
    transition: background-color 0.5s,color 0.5s,border .5s;
    box-shadow: 5px 10px 30px -1px rgba(0,0,0,0.4);
  }
  .btn:hover {
    background-color:  #f0d400;
  }
  .btn span.text {
    position: relative;
    padding: 0 45px 0 30px;
  }
  .btn span.text:before {
    content: "\e080";
    position: absolute;
    top: 50%;
    right: 25px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    font-size: .7rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateY(-50%);
    -webkit-transition: right 1s;
    transition: right 1s;
  }
  .btn:hover span.text:before {
    right: 15px;
  }
</style>
