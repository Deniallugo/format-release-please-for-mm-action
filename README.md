# Format release please for MatterMost 

Format output from Release Please and send it to MatterMost

## Inputs

### `release-please-output`
**REQUEIRED**  Release please output

### `MATTERMOST_WEBHOOK_URL`
**REQUIRED**  The Mattermost Incoming Webhook

### `MATTERMOST_CHANNEL`
The name of the channel you want to post, by default will post in the channel that was setup in the webhook creation
  
### `MATTERMOST_USERNAME`
The name of the sender of the message. ie, "GitHubAction"
  
  
### `MATTERMOST_ICON`
User/Bot icon shown with Mattermost message

## Example usage

```yaml
uses: Deniallugo/format-release-for-mm-action@v1.0
with:
  release-please-output: ${{ toJSON(steps.release.outputs) }}
  MATTERMOST_WEBHOOK_URL: ${{ secrets.MATTERMOST_WEBHOOK }}
```