export default function(_, target, url) {
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.src = url;
  target.appendChild(iframe);
}
