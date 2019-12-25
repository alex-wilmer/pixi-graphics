export let toHexNum = v => parseInt(Number(`0x${v.hex().slice(1)}`), 10)
