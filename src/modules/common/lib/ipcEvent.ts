export const IPC_RENDERER_ON_MESSAGE = 'IPC_RENDERER_ON_MESSAGE';
function getIpcRenderer() {
  return (window as any).ipcRenderer;
}

let callbackIpcId = 1;
const callbacks: any = {};

getIpcRenderer().on(IPC_RENDERER_ON_MESSAGE, (_event: any, arg: any) => {
  console.log('[IPC:renderer] on event', arg);
  const { event } = arg;
  if (event.callbackIpcId && callbacks[event.callbackIpcId]) {
    const callback = callbacks[event.callbackIpcId];
    if (event.error) {
      console.log('[IPC:renderer failure]', event.error);
      callback.reject && callback.reject(event.error);
    } else {
      console.log('[IPC:renderer success]', event.sendMessage);
      callback.resolve && callback.resolve(event.data);
    }
    delete callbacks[event.callbackIpcId];
  }
});

export interface IIpcRequest<T> {
  message: string;
  params?: T;
}
export interface IIpcResponse<T> {
  resultCode: number;
  resultMsg: string;
  data: T;
}

// TODO : IIpcRequest의 any 부분을 전달가능한 타입으로 선언하기
export const requestIpc = <T>(config: IIpcRequest<any>): Promise<IIpcResponse<T>> => {
  const _callbackIpcId = ++callbackIpcId;
  console.log('[IPC:renderer] send event', _callbackIpcId, config.message, config.params);
  getIpcRenderer().send(config.message, {
    ...config.params,
    sendMessage: config.message,
    callbackIpcId: _callbackIpcId,
  });
  return new Promise((resolve, reject) => {
    callbacks[_callbackIpcId] = {
      resolve,
      reject,
    };
  });
};

const ipcEvent = {
  requestIpc,
};
export default ipcEvent;
