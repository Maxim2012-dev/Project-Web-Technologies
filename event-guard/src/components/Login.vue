<template>
    <div class="mdc-text-field">
      <input type="text" id="my-text-field" class="mdc-text-field__input first-name-input">
      <label class="mdc-floating-label" for="my-text-field">First name</label>
      <div class="mdc-line-ripple"></div>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Login',
    }
  </script>
  
  <style>
    html, body {  
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 32px;
    }

    .mdc-text-field {
        margin-bottom: 24px;
        flex-shrink: 0;
    }
  </style>
  