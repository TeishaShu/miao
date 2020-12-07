<template>
  <div class="message-alert">
    <div
      v-for="(item, i) in messages"
      :key="i"
      class="alert alert-dismissible fade show"
      :class="'alert-' + item.status"
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
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  created () {
    const vm = this

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // 外層用$on註冊.內層用emit觸發
    vm.$bus.$on('message:push', (message, status = 'warning', fontawesome = 'fa-check') => {
      vm.updateMessage(message, status, fontawesome)
    })
    // vm.$bus.$emit('message:push','aaaaa','danger');
  },
  methods: {
    updateMessage (message, status, fontawesome) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp,
        fontawesome
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1) // 自己手動按關掉
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
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
