export enum LanyardOpcode {
  EVENT,
  HELLO,
  INITIALIZE,
  HEARTBEAT,
}

interface HeartBeat {
  heartbeat_interval: number;
}

export interface Response {
  op: LanyardOpcode;
  d: HeartBeat | Presence;
}

interface Spotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

interface Discord {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

interface Activity {
  type: number;
  timestamps: {
    start: number;
    end: number;
  };
  sync_id?: string;
  state?: string;
  session_id?: string;
  party?: {
    id: string;
  };
  name: string;
  id: string;
  flags?: number;
  details?: string;
  created_at: number;
  application_id?: number;
  assets: {
    small_text?: string;
    small_image?: number;
    large_text?: string;
    large_image?: number;
  };
}

export interface Presence {
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  activities: Array<Activity>;
  discord_status: string;
  spotify: Spotify | null;
  discord_user: Discord;
  kv: {
    location: string;
  };
}

export interface LanyardResponse {
  success: boolean;
  data: Presence | undefined;
}
