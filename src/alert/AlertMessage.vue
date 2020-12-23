<template>
  <div class="message-alert">
    <div
      v-for="(item, i) in messages"
      :key="i"
      class="alert alert-dismissible fade show"
      :class="'alert-' + item.status"
      role="alert"
    >
      <i
        class="fa pr-2"
        :class="item.fontawesome"
        aria-hidden="true"
      />
      <span>{{ item.message }}</span>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="closeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.state.AlertMessageModules.messages
    }
  },
  methods: {
    closeMessage (num) { // 自己手動按關掉
      this.$store.commit('AlertMessageModules/CLOSEMESSAHE', num)
    }
  }
}
</script>

<style lang="scss" scope>
  .message-alert {
    position: fixed;
    max-width: 50%;
    top: 130px;
    left: 0;
    right: 0;
    margin:0 auto;
    z-index: 1100;
  }
  i{
    font-size: 1.5rem;
    vertical-align: middle;
  }
  .alert>span{
    vertical-align: middle;
  }
</style>
