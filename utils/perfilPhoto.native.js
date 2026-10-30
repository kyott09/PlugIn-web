import { File, Paths } from 'expo-file-system';

function extensionDe(asset) {
  if (asset.mimeType === 'image/png') {
    return 'png';
  }

  if (asset.mimeType === 'image/webp') {
    return 'webp';
  }

  if (asset.mimeType === 'image/heic') {
    return 'heic';
  }

  return 'jpg';
}

export async function persistirFotoPerfil(asset) {
  const nombre = `perfil-${Date.now()}-${Math.random().toString(36).slice(2)}.${extensionDe(asset)}`;
  const destino = new File(Paths.document, nombre);

  await new File(asset.uri).copy(destino);

  return destino.uri;
}

export async function eliminarFotoPerfil(uri) {
  const uriDocumentos = Paths.document.uri.endsWith('/')
    ? Paths.document.uri
    : `${Paths.document.uri}/`;
  const prefijo = `${uriDocumentos}perfil-`;

  if (!uri || !uri.startsWith(prefijo)) {
    return;
  }

  try {
    const archivo = new File(uri);

    if (archivo.exists) {
      archivo.delete();
    }
  } catch (error) {
    console.warn('No se pudo eliminar la foto de perfil anterior:', error);
  }
}
