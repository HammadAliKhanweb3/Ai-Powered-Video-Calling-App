# Agent Voice Response Troubleshooting Guide

## Issue: Agent joins meeting but doesn't respond to voice

### 1. Environment Variables Check

Ensure these environment variables are set in your `.env.local` file:

```bash
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your_stream_video_api_key
STREAM_VIDEO_API_SECRET=your_stream_video_api_secret
OPENAI_API_KEY=your_openai_api_key
```

### 2. Webhook Configuration

Make sure your webhook URL is properly configured in Stream Video dashboard:

1. Go to your Stream Video dashboard
2. Navigate to Webhooks section
3. Add webhook URL: `https://your-domain.com/api/webhook`
4. Enable these events:
   - `call.session_started`
   - `call.session_participant_left`

### 3. Agent Instructions

Ensure your agent has proper voice conversation instructions. Example:

```
You are a helpful AI assistant for voice conversations. Be conversational, engaging, and provide clear, concise responses. Always respond naturally as if you're talking to someone face-to-face.
```

### 4. Debugging Steps

1. **Check Console Logs**: Look for these log messages in your server console:
   - "Webhook event received: call.session_started"
   - "Meeting started for ID: [meeting-id]"
   - "Connecting agent: [agent-name]"
   - "Agent user created/updated in Stream"
   - "OpenAI agent connected successfully"
   - "Agent session updated with instructions"

2. **Check Browser Console**: Look for these messages:
   - "Call accepted, agent should be joining..."
   - "Participant joined: [participant]"

3. **Verify Agent Creation**: Ensure the agent is properly created in your database with valid instructions.

### 5. Common Issues and Solutions

#### Issue: Agent not joining the call
- **Solution**: Check if the webhook is being triggered. Verify the webhook URL is accessible and properly configured.

#### Issue: Agent joins but doesn't speak
- **Solution**: 
  - Verify OpenAI API key is valid and has sufficient credits
  - Check if the agent instructions are appropriate for voice conversations
  - Ensure the voice configuration is properly set

#### Issue: No audio from agent
- **Solution**:
  - Check if the user's microphone is enabled
  - Verify the call settings include AI agent configuration
  - Ensure the agent voice settings are properly configured

### 6. Testing Steps

1. Create a new agent with simple instructions like: "You are a helpful assistant. Respond to any question asked."
2. Create a new meeting with this agent
3. Join the meeting and speak clearly
4. Check server logs for any errors
5. Verify the agent responds within a few seconds

### 7. Stream Video Configuration

Ensure your Stream Video app has:
- AI Agent feature enabled
- Proper webhook configuration
- Valid API keys
- Sufficient credits for OpenAI integration

### 8. OpenAI Configuration

- Ensure your OpenAI API key has access to GPT-4 or GPT-3.5-turbo
- Check if you have sufficient credits
- Verify the API key is not rate-limited

### 9. Network and Security

- Ensure your webhook endpoint is publicly accessible
- Check if your firewall is blocking webhook requests
- Verify SSL certificates if using HTTPS

### 10. Contact Support

If the issue persists:
1. Check Stream Video documentation: https://docs.stream.io/video/
2. Contact Stream Video support with your logs
3. Verify your OpenAI API usage and limits

## Quick Fix Checklist

- [ ] Environment variables set correctly
- [ ] Webhook URL configured in Stream dashboard
- [ ] Agent has voice-appropriate instructions
- [ ] OpenAI API key is valid and has credits
- [ ] Server logs show successful agent connection
- [ ] User microphone is enabled
- [ ] Call settings include AI agent configuration 