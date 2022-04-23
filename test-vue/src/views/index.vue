<script setup>
import {ref} from 'vue';
import axios from 'axios';
const bizButtonName = ref("");
const bizGetName = ref("");
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
function bizLog() {
  window._MITO_.log({ message: { name: 'biz', data: 111 }, tag: '测试' })
}
function codeError() {
  let a = {}
  a.split('/')
}
function promiseError() {
  const promiseWrap = () =>
    new Promise((resolve, reject) => {
      reject('promise reject')
    })
  promiseWrap().then((res) => {
    console.log('res', res)
  })
}
function mitoLog() {
  window._MITO_.log({ message: { one: 111 }, tag: '测试' })
}
function onClickNativeFetch() {
  fetch('http://localhost:3000/sdk-test/normal/post', {
    method: 'POST',
    body: JSON.stringify({ test: '测试请求体' }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    res.text().then((res) => console.log('res', res))
  })
}
function onClickNativeErrorFetch() {
  fetch('http://localhost:3000/sdk-test/exception/post', {
    method: 'POST',
    body: JSON.stringify({ test: '测试请求体' }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(
    (res) => {
      res.text().then((res) => console.log('res', res))
    },
    (err) => {
      console.log('err', err)
    }
  )
}
function onClickXhrNormal() {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'http://localhost:3000/sdk-test/normal')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  }
}
function onClickXhrError() {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'http://localhost:3000/sdk-test/exception')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  }
}
async function onGetKeyEvent() {
  await axios.post('http://localhost:3000/graph-query/key-event', {
    targets: [{
        type: 'Customer',
        level: 'error',
        data: '{"name":"报告渲染完成"}',
    }]
  })
}
</script>

<template>
  <h1>native-js:控制台输出信息调试</h1>
  <div>
    <input v-model="bizButtonName" />
    <button id="bizButton" @click="">{{ `${bizButtonName ? bizButtonName : '请输入自定义按钮名'}`}}</button>
    <input v-model="bizGetName" />
    <button id="bizGetButton" @click="bizGet(bizGetName)">get {{bizGetName}}</button>
    <button id="logUpload" @click="bizLog">biz log</button>
  </div>
  <div>
    <button id="codeErr" @click="codeError">代码错误</button>
    <button id="normalReq" @click="onClickXhrNormal">xhr正常请求</button>
    <button id="exceptionReq" @click="onClickXhrError">xhr异常请求</button>
    <button id="normalFetch" @click="onClickNativeFetch">Fetch正常请求</button>
    <button id="exceptionFetch" @click="onClickNativeErrorFetch">Fetch异常请求</button>
    <button id="logUpload" @click="mitoLog">log上报</button>
    <button id="promiseError" @click="promiseError">promiseError</button>
  </div>
  <div>
    <button id="getKeyEvent" @click="onGetKeyEvent">测试查找路径关键节点</button>
  </div>
</template>

<style>
div {
    margin-bottom: 20px;
}
</style>


