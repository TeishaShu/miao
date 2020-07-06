<template>
  <div class="message-alert">
    <div class="alert alert-warning alert-dismissible alert-dismissible fade show" role="alert">
      You should check in on some of those fields below.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
   name: 'alertMessage',
  data() {
    return {
      messages: [],
    };
  },
  methods:{

  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 130px;
  right: 50%;
  z-index: 1100;
}
</style>