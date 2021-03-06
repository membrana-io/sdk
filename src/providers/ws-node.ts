import WebSocket from 'ws';
import StreamProvider, { IStreamProviderOptions } from './stream';

class WSStreamProviderNode extends StreamProvider {
  protected wsInstance: WebSocket;

  constructor(options: IStreamProviderOptions) {
    super(options);
    const headers = { Authorization: this.Authorization };
    this.wsInstance = new WebSocket(this.url, { headers });
    this.wsInstance.on('open', () => this.emit('open'));
    this.wsInstance.on('error', (err: any) => this.emit('error', err));
    this.wsInstance.on('close', this.onClose.bind(this));
    this.wsInstance.on('message', (msgData: WebSocket.Data) => {
      try {
        const msg = JSON.parse(String(msgData));
        this.onMessage(msg);
      } catch (e) {
        console.error('failed to parse ws event data', e.message || e);
      }
    });
  }

  protected send(data: string): void {
    if (this.wsInstance.readyState === this.wsInstance.OPEN) {
      this.wsInstance.send(data);
    } else {
      this.wsInstance.once('open', this.wsInstance.send.bind(this.wsInstance, data));
    }
  }
}

export = WSStreamProviderNode;
