<script setup>
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
  console.log('12312')
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
</script>

<template>
  <h1>native-js:控制台输出信息调试</h1>
  <button id="codeErr" @click="codeError">代码错误</button>
  <button id="normalReq" @click="onClickXhrNormal">xhr正常请求</button>
  <button id="exceptionReq" @click="onClickXhrError">xhr异常请求</button>
  <button id="normalFetch" @click="onClickNativeFetch">Fetch正常请求</button>
  <button id="exceptionFetch" @click="onClickNativeErrorFetch">Fetch异常请求</button>
  <button id="logUpload" @click="mitoLog">log上报</button>
  <button id="promiseError" @click="promiseError">promiseError</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
