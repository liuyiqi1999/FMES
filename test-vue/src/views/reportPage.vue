<script setup>
import { onBeforeMount } from 'vue'

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

onBeforeMount(() => {
    bizGet('getReportWithTime');
})

function check() {
  window._MITO_.log({ message: { name: 'CHECK' }, tag: 'file' })
}

function update() {
  window._MITO_.log({ message: { name: 'update', data: 111 }, tag: 'file' })
}
function push() {
  window._MITO_.log({ message: { name: 'push', data: 111 }, tag: 'file' })
}
</script>

<template>
<h2>报告文件</h2>
<button id="report-run" @click="update">更新报告</button>
<button id="report-send" @click="push">推送报告消息</button>
<button id="report-check" @click="check">CHECK! </button>
</template>