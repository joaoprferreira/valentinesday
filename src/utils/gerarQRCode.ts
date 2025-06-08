import qrcode from 'qrcode'

export const gerarQRCode = async (url: string) => {
  return await qrcode.toDataURL(url)
}
