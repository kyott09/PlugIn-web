export async function persistirFotoPerfil(asset) {
  if (!asset.base64) {
    throw new Error('El navegador no devolvió los datos de la imagen.');
  }

  const mimeType = asset.mimeType?.startsWith('image/')
    ? asset.mimeType
    : 'image/jpeg';

  return `data:${mimeType};base64,${asset.base64}`;
}

export async function eliminarFotoPerfil() {}
