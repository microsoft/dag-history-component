export default function isNumber(d: any) {
  return d !== null && d !== undefined && !Number.isNaN(d);
}
