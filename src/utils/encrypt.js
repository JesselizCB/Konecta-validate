import NodeRSA from 'node-rsa';

function encryptData(data) {
  const appKey = process.env.VUE_APP_PUBLIC_KEY;
  const publicKey = appKey.replace(/\\n/g, '\n');

  const key = new NodeRSA();
  key.setOptions({
    encryptionScheme: 'pkcs1',
  });
  key.importKey(publicKey, 'pkcs8-public');
  const dataEncrypted = key.encrypt(data, 'base64');
  return dataEncrypted;
}

export default encryptData;
