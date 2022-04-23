<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router = useRouter();
function jumpFile(){
    router.push('/file');

}
</script>

<template>
<h2>大盘</h2>
<button id="dashboard-menu">大盘侧栏</button>
<button id="dashboard-report" @click="jumpFile">查看大盘报告</button>
</template>