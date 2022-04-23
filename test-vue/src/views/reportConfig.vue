<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router = useRouter();
function bizGet(name) {
  const xhr = new XMLHttpRequest()
  xhr.open('get', `http://localhost:3000/sdk-test/normal?name=${name}`)
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  }
}
function jumpFile(){
    router.push('/file');

}
</script>

<template>
<h2>周报配置页</h2>
<button id="show-report-list-button" @click="bizGet('ReportList')">展开报告文件列表</button>
<button id="jump-to-file" @click="jumpFile">查看报告文件</button>
</template>