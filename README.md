# Format release please for MatterMost 

Format output from Release Please and send it to MatterMost

## ENV 
### `RELEASE_PLEASE_OUTPUT`
**REQUEIRED**  Release please output

## Inputs

### `mattermost-url`
**REQUIRED**  The Mattermost Incoming Webhook

### `mattermost-channel`
The name of the channel you want to post, by default will post in the channel that was setup in the webhook creation
  
### `mattermost-username`
The name of the sender of the message. ie, "GitHubAction"
  
  
### `mattermost-icon`
User/Bot icon shown with Mattermost message

## Example usage

```yaml
uses: Deniallugo/format-release-for-mm-action@v1.0
with:
  release-please-output: ${{ steps.release.outputs }}
  mattermost-url: ${{ secrets.MATTERMOST_WEBHOOK }}
```