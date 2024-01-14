<template>
  <div v-if="showChatBox" class="chat-box">
    <div class="header">
      <div class="title">xxx交流中</div>
      <i class="el-icon-close" @click="closeChatBox" />
    </div>
    <div class="body">
      <iframe src="https://www.w3school.com.cn" frameborder="0" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChatBox',
  computed: {
    ...mapState({
      showChatBox: state => state.settings.showChatBox
    })
  },
  methods: {
    closeChatBox() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showChatBox',
        value: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-box {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 2000;
  width: 350px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  overflow: hidden;

  .header {
    min-height: 30px;
    padding: 10px 44px 10px 20px;
    background-color: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;

    .title {
      max-width: 100%;
      word-wrap: break-word;
    }

    .el-icon-close {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -7px;
      cursor: pointer;
    }
  }

  .body {
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
