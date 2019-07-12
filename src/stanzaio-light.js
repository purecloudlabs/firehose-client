import Disco from 'stanza/plugins/disco';
import Extdisco from 'stanza/plugins/extdisco';
import Logging from 'stanza/plugins/logging';
import Pubsub from 'stanza/plugins/pubsub';
import Ping from 'stanza/plugins/ping';
import fetch from 'whatwg-fetch/fetch'; // eslint-disable-line
import { Client } from 'stanza/browser-module';

export { JID } from 'xmpp-jid';
export { Client } from 'stanza/browser-module';

export function createClient (opts) {
  var client = new Client(opts);
  [
    Disco, // must be first

    Extdisco,
    Logging,
    Pubsub,
    Ping
  ].map(client.use.bind(client));

  return client;
}
