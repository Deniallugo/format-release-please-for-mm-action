const core = require('@actions/core');

try {
    const payload = core.getInput('release-please-output');
    if (!payload) {
        console.log("Empty payload");
        return;
    }
    const mm_webhook = core.getInput('MATTERMOST_WEBHOOK_URL');
    if (mm_webhook == "") {
        console.log("MATTERMOST_WEBHOOK_URL is empty");
        return;
    } 
    const channel = core.getInput('MATTERMOST_CHANNEL');
    const username = core.getInput('MATTERMOST_USERNAME');
    const icon = core.getInput('MATTERMOST_ICON');


    const releases = preparePayload(payload);
    const text = releases.join(" \n ");
    sendMessage(text, webhook, icon, username, channel);
} catch (error) {
  core.setFailed(error.message);
}


function preparePayload(payload){
    const paths_released = JSON.parse(payload['paths_released']);
    let releases = [];
    for(const path of paths_released) {
        const version = payload[`${path}--version`];
        const body = payload[`${path}--body`];
        const text = `${path} ${version} \n ${body}`;
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

    fetch(webhook, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      }).then(res => {
        console.log("Request complete! response:", res);
      }
    );
}