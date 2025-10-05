export const categorias = ["regalo","chocolate","peluche"];
export function isValidUrl(v){
  try { new URL(v); return true; } catch { return false; }
}
