import { LanyardOpcode, LanyardResponse, Response, Presence } from "./types";
import { SetStoreFunction } from "solid-js/store";
import { w3cwebsocket } from "websocket";

const REST_URL = "https://api.lanyard.rest/v1/users/";
const WS_URL = "wss://api.lanyard.rest/socket";

export const useLanyardREST = async (id: string) =>
  await fetch(REST_URL + id)
    .then((response) => response.json())
    .then((response) => response as LanyardResponse);

export const useLanyardWS = async (
  id: string,
  setResponse: SetStoreFunction<Presence>,
  heartbeat_interval: number
) => {
  const send = (ws: w3cwebsocket, message: object) => {
    ws.send(JSON.stringify(message));
  };
  const update = (data: any): data is Presence => {
    setResponse(data);
    return true;
  };
  let client = new w3cwebsocket(WS_URL);
  client.onopen = async () => {
    send(client, {
      op: LanyardOpcode.INITIALIZE,
      d: {
        subscribe_to_id: id,
      },
    });
    setInterval(() => {
      send(client, {
        op: LanyardOpcode.HEARTBEAT,
        d: undefined,
      });
    }, heartbeat_interval);
  };
  client.onmessage = async (m: any) => {
    const d = JSON.parse(m.data) as Response;
    update(d.d);
  };
};
