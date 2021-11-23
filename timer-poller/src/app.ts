import { messageStream } from "./lib/queues";
import { mergeMap } from "rxjs/operators";
import { invokeUrl } from "./lib/invoke";

(async () => {
    const messageStream$ = await messageStream(process.env.CONSUMER_QUEUE_NAME!);

    await messageStream$
        .pipe(
            mergeMap(invokeUrl, 100)
        ).toPromise();
})();