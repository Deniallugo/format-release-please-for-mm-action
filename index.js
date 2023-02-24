const core = require('@actions/core');
const axios = require('axios');

try {
    let payload = core.getInput('release-please-output');
    if (payload == "") {
        throw Error("Empty output");
    }

    payload = JSON.parse(payload);
    const mm_webhook = core.getInput('mattermost-url');
    if (mm_webhook == "") {
        throw Error("mattermost-url is empty");
    } 
    
    const channel = core.getInput('mattermost-channel');
    const username = core.getInput('mattermost-username');
    const icon = core.getInput('mattermost-icon');


    const releases = preparePayload(payload);
    const text = releases.join("\n");
    sendMessage(text, mm_webhook, icon, username, channel);
} catch (error) {
  core.setFailed(error.message);
}


function preparePayload(payload){
    const paths_released = JSON.parse(payload['paths_released']);
    let releases = [];
    for(const path of paths_released) {
        const body = payload[`${path}--body`];
        const text = `\n # ${path} \n ${body} \n`;
        releases.push(text);
    } 
    return releases;
}

function sendMessage(text, webhook, icon, username, channel) {
    let data = {text};
    if (icon != "") {
        data.icon_url = icon;
    } 
    
    if (username != "") {
        data.username = username;
    } 

    if (channel != "") {
        data.channel = channel;
    }

    axios.post(webhook, data)
    .then((_) => {
    }).catch((err) => {
        throw Error(err);
    });
}