'use strict';

const test = require('ava');
const sinon = require('sinon');

const pcStream = require('../../src/client');

let xmppInfo, extendObject, clientStanza, stanzaioInstance;
test.beforeEach(() => {
  xmppInfo = {
    jid: 'anon@anon.lance.im',
    authToken: 'AuthToken',
    host: 'wss://example.com/test'
  };

  // Stub stanzaio connection
  stanzaioInstance = {
    on: () => {
      return {
        bind: sinon.stub()
      };
    },
    connect: () => {
      return {
        bind: sinon.stub()
      };
    },
    disconnect: () => {
      return {
        bind: sinon.stub()
      };
    },
    emit: () => {
      return {
        bind: sinon.stub()
      };
    }
  };

  clientStanza = {
    createClient: sinon.stub()
  };

  clientStanza.createClient.withArgs(sinon.match.any).returns(stanzaioInstance);
});

test('client creation', t => {
  pcStream.client(xmppInfo);
  const clientStanzaPayload = {
    jid: 'anon@anon.lance.im',
    credentials: {
      username: 'anon@anon.lance.im',
      password: 'authKey:AuthToken'
    },
    transport: 'websocket',
    wsURL: 'wss://example.com/test/stream'
  };
  clientStanza.createClient(clientStanzaPayload);
  const expectedPayload = {
    jid: 'anon@anon.lance.im',
    credentials: {
      username: 'anon@anon.lance.im',
      password: 'authKey:AuthToken'
    },
    transport: 'websocket',
    wsURL: 'wss://example.com/test/stream'
  };
  t.deepEqual(clientStanza.createClient.args[0][0], expectedPayload);
});

test('connect jid override', t => {
  t.plan(0);
  let con = pcStream.client(xmppInfo);
  con.connect({
    jid: 'anon@anon.lance.im'
  });
  const connectPayload = {
    jid: 'anon@anon.lance.im',
    credentials: {
      username: 'anon@anon.lance.im',
      password: 'authKey:AuthToken'
    },
    transport: 'websocket',
    wsURL: 'wss://example.com/test/stream'
  };
  stanzaioInstance.connect(connectPayload);
});

test('connect full override', t => {
  t.plan(0);
  let con = pcStream.client(xmppInfo);
  con.connect({
    jid: 'anon@anon.lance.im',
    authToken: 'AuthTokenAlt',
    host: 'wss://example.com/testAlt'
  });
  const connectPayload = {
    jid: 'anon@anon.lance.im',
    credentials: {
      username: 'anon@anon.lance.im',
      password: 'authKey:AuthToken'
    },
    wsURL: 'wss://example.com/test/stream',
    transport: 'websocket'
  };
  stanzaioInstance.connect(connectPayload);
});

test('extend should return an extendObject', t => {
  t.plan(1);
  const actual = pcStream.extend(false);
  t.deepEqual(actual, extendObject);
});
