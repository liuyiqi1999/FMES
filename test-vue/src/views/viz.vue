<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { migrateFromOldConfig } from "neovis.js";
import NeoVis from 'neovis.js';
import { FormInst } from 'naive-ui';
import { Add12Regular as AddIcon, DatabaseSearch24Regular as SearchIcon, ArrowReset32Regular as ResetIcon } from '@vicons/fluent';
import axios from 'axios';

const isEditing = ref(true);
const isSpining = ref(false);
async function reload(f: Function) {
    isSpining.value = true;
    await f();
    viz.reinit(keyEventConfig);
    // viz.reload();
    isSpining.value = false;
}
onMounted(() => {
    draw();
})
let viz;
const keyEventConfig = migrateFromOldConfig({
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "neo4j",
    server_password: "lyq56699338",
    labels: {
        "AbstractEvent": {
            "caption": "type",
            "size": "pagerank",
            "community": "keyEventCommunity",
            "title_properties": [
                "level",
                "category",
                "data",
                "pagerank"
            ]
        },
        [NeoVis.NEOVIS_DEFAULT_CONFIG]: {
            "caption": "defaultCaptionProperty",
            "size": "defaultPagerank",
            "community": "defaultCommunity",
        }
    },
    relationships: {
        "NEXT": {
            "thickness": "count",
            "caption": false
        }
    },
    arrows: true,
    initial_cypher: "MATCH (n:AbstractEvent)-[r:NEXT]->(m:AbstractEvent) RETURN n,r,m"
} as any);
function draw() {
    viz = new NeoVis(keyEventConfig);
    viz.render();
}

interface EventType {
    type: string,
    level: string,
    data: string,
}

interface ModelType {
    targets: EventType[],
    isWeight: boolean
    sourceNodes: EventType[],
}

const keyEventFormRef = ref<FormInst | null>(null);
const keyEventModel = ref<ModelType>({
    targets: [],
    isWeight: false,
    sourceNodes: []
})

async function onGetKeyEvent() {
    await reload(async () => {
        await axios.post('http://localhost:3000/graph-query/key-event', {
            targets: [{
                type: 'Customer',
                level: 'error',
                data: '{"name":"CHECK"}',
            }]
        })
    })
    isEditing.value = false
}
async function onGetKeyEventWithSource() {
    await reload(async () => {
        await axios.post('http://localhost:3000/graph-query/key-event', {
            targets: [{
                type: 'Customer',
                level: 'error',
                data: '{"name":"CHECK"}',
            }],
            sources: [{
            type: 'Route',
            level: 'info',
            data: '{"from":"/file","to":"/config"}'
            }]
        })
    })
    isEditing.value = false
}
async function clearGraph() {
    await reload(async () => {
        await axios.post('http://localhost:3000/graph-query/clear')
    })
}
async function clearAndReset() {
    await clearGraph();
    isEditing.value = true;
}

</script>

<template>
<div id="wrapper">
    <n-layout has-sider>
        <n-layout-sider
            collapse-mode="transform"
            :collapsed-width="100"
            :width="850"
            show-trigger="bar"
            content-style="padding: 24px;"
            bordered
        >
            <n-collapse default-expanded-names="1" accordion >
                <n-collapse-item title="分析关键节点" name="1">
                    <div class="result-wrapper" v-if="!isEditing">
                        <n-alert title="分析完成" type="success" style="margin-bottom: 10px;">
                        </n-alert>
                        <n-table :bordered="false" :single-line="false">
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>type</th>
                                    <th>category</th>
                                    <th>data</th>
                                    <th>得分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1<n-tag type="success" style="margin-left: 5px;">目标节点</n-tag></td>
                                    <td>Customer</td>
                                    <td>debug</td>
                                    <td>{"name": "CHECK"}</td>
                                    <td>1.0</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>UI.Click</td>
                                    <td>user</td>
                                    <td>{{`<button id=\"report-check\">CHECK!</button>`}}</td>
                                    <td>0.991302</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Xhr</td>
                                    <td>http</td>
                                    <td>{request: {url: "/report/getReportWithTime"}}</td>
                                    <td>0.866193</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Xhr</td>
                                    <td>http</td>
                                    <td>{request: {}, exception: "getException"}</td>
                                    <td>0.736772</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Route</td>
                                    <td>user</td>
                                    <td>{"from":"/viz","to":"/file"}</td>
                                    <td>0.544647</td>
                                </tr>
                            </tbody>
                        </n-table>
                        <n-button style="width: 100%; margin-top: 20px;" @click="clearAndReset">
                            重置
                            <template #icon>
                                <n-icon>
                                    <reset-icon />
                                </n-icon>
                            </template>
                        </n-button>
                    </div>
                    <div class="key-event-settings" v-else>
                        <n-form ref="keyEventFormRef" :model="keyEventModel" class="key-event-settings-wrapper">
                            <div class="key-event-setting">
                                <n-h4>目标节点</n-h4>
                                <n-card>
                                    <n-form-item label="type">
                                        <n-input />
                                    </n-form-item>
                                    <n-form-item label="level">
                                        <n-input />
                                    </n-form-item>
                                    <n-form-item label="data">
                                        <n-input />
                                    </n-form-item>
                                </n-card>
                                <n-button style="margin-top:10px; width: 100%;"><n-icon><add-icon></add-icon></n-icon></n-button>
                            </div>
                            <div class="key-event-setting">
                                <n-h4>起始节点</n-h4>
                                <!-- <n-card>
                                    <n-form-item label="type">
                                        <n-input />
                                    </n-form-item>
                                    <n-form-item label="level">
                                        <n-input />
                                    </n-form-item>
                                    <n-form-item label="data">
                                        <n-input />
                                    </n-form-item>
                                </n-card> -->
                                <n-button style="margin-top:10px; width: 100%;"><n-icon><add-icon></add-icon></n-icon></n-button>
                            </div>
                            <div class="key-event-setting">
                                <div style="display: flex; align-items: center;">
                                    <n-h4 style="margin: 0 15px 0 0;">考虑关系权重</n-h4>
                                    <n-switch />
                                </div>
                                <div class="info">
                                    <p>该功能将在事件流中寻找导向目标节点路径中最关键的节点。你可以根据分析结果判断项目中的控制点、瓶颈点或脆弱点。</p>
                                    <p>起始节点是非必需设置，指定起始节点可以使分析结果围绕某一个入口事件生成，更有针对性。</p>
                                    <p>考虑关系权重将使得高频的用户行为路径对分析结果起到更高的影响，当上报数据混乱或项目规模较大时效果更好。</p>
                                </div>
                                <n-button type="success" style="width: 100%; " @click="onGetKeyEvent">
                                    运行
                                    <template #icon>
                                        <n-icon>
                                            <search-icon />
                                        </n-icon>
                                    </template>
                                </n-button>
                                <n-button style="width: 100%; margin-top: 20px;" @click="clearGraph">
                                    重置
                                    <template #icon>
                                        <n-icon>
                                            <reset-icon />
                                        </n-icon>
                                    </template>
                            </n-button>
                            </div>
                        </n-form>
                    </div>
                </n-collapse-item>
                <n-collapse-item title="高阶异常定位" name="2">
                <div>WIP</div>
                </n-collapse-item>
                <n-collapse-item title="业务路径分析" name="3">
                <button @click="onGetKeyEventWithSource">test source nodes</button>
                </n-collapse-item>
            </n-collapse>
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
            <n-spin :show="isSpining">
                <div id="viz"></div>
            </n-spin>
        </n-layout-content>
    </n-layout>
</div>
</template>

<style>
#wrapper {
    width: 100%;
}
.key-event-settings {
    text-align: left;
    padding: 10px 20px;
}
.key-event-settings-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.key-event-setting {
    display: inline-block;
    max-width: 250px;
    min-width: 220px;
}
.info {
    color: gray;
}
#viz {
    width: 100%;
    height: 650px;
    border: 1px solid lightgray;
    border-radius: 10px;
    font: 22pt arial;
    margin: 0;
}
.result-line > * {
    margin-right: 5px;
}
.vis-tooltip {
    max-width: 300px;
    word-break: break-all !important;
    white-space: pre-line !important;
    text-align: left !important;
    padding: 10px 15px !important;
    line-height: 20px !important;
    background: #fdfdfd !important;
}
</style>
