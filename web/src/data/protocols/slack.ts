import type { CardFields } from "../../types/catalog";
import type { ProtocolConfig } from "../../types/protocol";

export const card: CardFields = {
  name: "slack",
  partTag: "SLACK",
  category: "messaging",
  nodes: ["agent", "slack", "channels"],
  purpose:
    "Lets an agent read and post to Slack — channels, threads, reactions, and user lookups — through bot-token-scoped MCP tools.",
  stats: [
    ["8", "MCP tools"],
    ["bot-token", "auth"],
    ["workspace", "scope"],
  ],
};

const config: ProtocolConfig = {
  ...card,
  highlight: "bot-token-scoped",
  repo: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/slack",
  package: "@modelcontextprotocol/server-slack",
  license: "MIT",
  flow: {
    input: {
      label: "agent intent",
      sub: "← 'post deploy update to #eng'",
    },
    steps: [
      {
        n: 1,
        name: "slack_list_channels",
        args: "limit?, cursor?",
        body: "Maps channel names to IDs. Every other tool takes channel_id, not channel_name — this is the first lookup the agent has to make.",
        question: '"which channel?"',
      },
      {
        n: 2,
        name: "slack_get_channel_history",
        args: "channel_id, limit?",
        body: "Recent messages for grounding — the agent reads existing context before contributing, avoiding duplicate or off-topic posts.",
        question: '"what\'s already been said?"',
      },
      {
        n: 3,
        name: "slack_post_message · slack_reply_to_thread",
        args: "channel_id, text, thread_ts?",
        body: "Post a top-level message, or reply inside an existing thread. The agent picks based on whether it's starting a discussion or continuing one.",
        question: '"new post or reply?"',
        branch: {
          n: "!",
          name: "thread context",
          condition: "if continuing a thread",
          body: "Use slack_reply_to_thread with thread_ts. Posting a top-level message instead breaks the conversation and pings the whole channel.",
        },
      },
    ],
  },
  tools: [
    { name: "slack_list_channels", sub: "name → channel_id mapping" },
    { name: "slack_get_channel_history", sub: "recent messages, paginated" },
    { name: "slack_post_message", sub: "top-level message in a channel" },
    { name: "slack_reply_to_thread", sub: "reply inside an existing thread" },
    { name: "slack_get_thread_replies", sub: "full thread by thread_ts" },
    { name: "slack_add_reaction", sub: "emoji reaction by message ts" },
    { name: "slack_get_users", sub: "workspace user list" },
    { name: "slack_get_user_profile", sub: "single user's profile fields" },
  ],
  notes: [
    {
      condition: "bot-token only",
      body: "Requires a Slack bot token (xoxb-...). The bot must be invited to each channel it reads or posts in — agent gets not_in_channel otherwise.",
    },
    {
      condition: "no DMs · no archived",
      body: "Server lists public + pre-defined channels. DMs and archived channels are out of scope. Use the Slack web API directly if you need them.",
    },
  ],
  example: {
    lang: "json",
    code: '{\n  "mcpServers": {\n    "slack": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-slack"],\n      "env": {\n        "SLACK_BOT_TOKEN": "xoxb-...",\n        "SLACK_TEAM_ID": "T01234567"\n      }\n    }\n  }\n}',
    captions: [
      "Bot token + team ID in env, never on the command line",
      "Invite the bot to each channel — list_channels won't surface ones it can't see",
    ],
  },
  install: {
    npx: "npx -y @modelcontextprotocol/server-slack",
    docker: "docker run -e SLACK_BOT_TOKEN -e SLACK_TEAM_ID mcp/slack",
  },
  worksWith: ["Claude Desktop · Claude Code", "Cursor · VS Code", "Any MCP client"],
};

export default config;
