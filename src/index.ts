import { LanyardOpcode, LanyardResponse, Response, Presence } from "./types";
import { WebSocket } from "ws";
import { createSignal } from "solid-js";

const REST_URL = "https://api.lanyard.rest/v1/users/";
const WS_URL = "wss://api.lanyard.rest/socket";

export const useLanyardREST = async (id: string) =>
    await fetch(REST_URL + id)
        .then((response) => response.json())
        .then((response) => response as LanyardResponse);

export const useLanyardWS = async (id: string, heartbeat_interval: number) => {
    const [response, setResponse] = createSignal({});
    const send = (ws: WebSocket, message: object) => {
        ws.send(JSON.stringify(message));
    };
    const update = (data: any): data is Presence => {
        setResponse(data);
        return true;
    }
    let client = new WebSocket(WS_URL);
    client.onopen = async () => {
        send(client, {
            op: LanyardOpcode.INITIALIZE,
            d: {
                subscribe_to_id: id,
            }
        });
        setInterval(() => {
            send(client, {
                op: LanyardOpcode.HEARTBEAT,
                d: undefined
            })
        }, heartbeat_interval);
    };
    client.onmessage= async (m: any) => {
        const d = JSON.parse(m.data) as Response;
        update(d.d);
    };
    return response;
}
