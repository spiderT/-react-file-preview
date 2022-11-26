import renders from './renders';

export async function readBuffer(file: any) {
  if (!file) {
    return;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (loadEvent) => resolve(loadEvent.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
}

export async function readDataURL(buffer: BlobPart) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (loadEvent) => resolve(loadEvent.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(new Blob([buffer]));
  });
}

export async function readText(buffer: BlobPart) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (loadEvent) => resolve(loadEvent.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(new Blob([buffer]), 'utf-8');
  });
}

export function getExtend(name: string) {
  const dot = name.lastIndexOf('.');
  return name.substr(dot + 1);
}

export async function render(buffer: any, type: string | number, target: any, url: string) {
  console.log('url', url);
  // @ts-ignore
  const handler = renders[type];
  if (handler) {
    return handler(buffer, target, url);
  }
  // @ts-ignore
  return renders.error(buffer, target, type);
}
