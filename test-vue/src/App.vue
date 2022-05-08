<script setup lang="ts">
import {h, ref, Component, watchEffect} from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {RouterLink, useRoute} from 'vue-router'
import {
  Home16Regular as HomeIcon,
  TopSpeed20Regular as DashboardIcon,
  BookNumber24Regular as ConfigIcon,
  Alert32Regular as FileIcon,
  Eye12Regular as VizIcon
} from '@vicons/fluent'
const route = useRoute();
const activeKey = ref("");
watchEffect(() => {
  activeKey.value = route.path.substring(1);
})
function renderIcon (icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)});
}
const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/home'
        }
      },
      { default: () => 'Home'}
    ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/config'
        }
      },
      { default: () => 'Report Config'}
    ),
    key: 'config',
    icon: renderIcon(ConfigIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/file'
        }
      },
      { default: () => 'Report File'}
    ),
    key: 'file',
    icon: renderIcon(FileIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/dashboard'
        }
      },
      { default: () => 'Dashboard'}
    ),
    key: 'dashboard',
    icon: renderIcon(DashboardIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          path: '/viz'
        }
      },
      { default: () => 'Visualization'}
    ),
    key: 'viz',
    icon: renderIcon(VizIcon)
  }
]

</script>

<template>
  <div style="height: 40px;">
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
