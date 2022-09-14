Use Lanyard API in your SolidJS application!

- using yarn: `yarn add solidjs-lanyard`
- using npm: `npm i solidjs-lanyard`

Checkout [types.ts](https://github.com/notseanray/solid-lanyard/blob/master/src/types.ts) for all the fields

This package is not tested very well, if you encounter issues please report them here: [solidjs-lanyard](https://github.com/notseanray/solid-lanyard)

websocket example component

```javascript
import { useLanyardWS } from "solidjs-lanyard";
import { createStore } from "solid-js/store";
const DISCORD_ID = "566444484850745351";

const Discord = () => {
    const [user, setUser] = createStore({});
    // Your discord ID, store setter, keep alive interval for websocket
    useLanyardWS(DISCORD_ID, setUser, 1000);
    return(<>
        <Show when={user.loading}>
            loading!
        </Show>
        <Show when={!user.loading}>
            {user()?.discord_user?.username}
        </Show>
    </>);
}
```

REST API example component

```javascript
import { useLanyardREST } from "solidjs-lanyard";
import { createResource } from "solid-js";
const DISCORD_ID = "566444484850745351";

const Discord = () => {
    const [user] = createResource(DISCORD_ID, useLanyardREST);
    return(<>
        <Show when={user.loading}>
            loading!
        </Show>
        <Show when={!user.loading}>
            {user()?.discord_user?.username}
        </Show>
    </>);
}
```
