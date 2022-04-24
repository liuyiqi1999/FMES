<script setup>
import { onMounted } from 'vue';
import { migrateFromOldConfig } from "neovis.js";
import NeoVis from 'neovis.js';
onMounted(() => {
    draw();
})
let viz;
function draw() {
    var config = {
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
                    "pagerank",
                    "keyEventCommunity"
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
    };
    const newConfig = migrateFromOldConfig(config);
    viz = new NeoVis(newConfig);
    viz.render();
}
</script>

<template>
<div id="wrapper">
    <div id="viz"></div>
</div>
</template>

<style>
#wrapper {
    width: 100%;
}
#viz {
    width: 80%;
    height: 800px;
    border: 1px solid lightgray;
    font: 22pt arial;
    margin: 20px auto;
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
