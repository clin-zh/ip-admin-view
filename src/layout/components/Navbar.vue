<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <div class="right">
        <span>账户余额</span>
        <span class="balance">¥{{ userInfo.balance || 0 }} </span>
        <div class="icon-box">
          <i class="fa-solid fa-bell icon" @click="handleClickBell" />
          <i class="fa-solid fa-headphones icon" @click="handleClickHeadphones" />
        </div>
      </div>

      <!-- <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template> -->

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <span class="name">{{ userInfo.name || '' }}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    // Breadcrumb,
    Hamburger
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    // Search
  },
  computed: {
    ...mapState({
      userInfo: state => state.user
    }),
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },

    handleClickBell() {
      console.log('点击了铃铛')
    },

    handleClickHeadphones() {
      this.$store.dispatch('settings/changeSetting', {
        key: 'showChatBox',
        value: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;
    line-height: 30px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          font-size: 14px;
          margin: 0 10px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    line-height: 30px;
  }

  .icon-box {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    padding: 0 10px;
    margin: 0 10px;

    .icon {
      margin: 0 8px;
      color: #ccc;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .balance {
    margin-left: 10px;
    font-weight: bold;
    color: #409EFF;
  }

  .user-wrap {
    display: flex;
    align-items: center;

    .avatar {
      width: 25px;
      height: 25px;
      margin-right: 10px;
      background-color: #ccc;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
