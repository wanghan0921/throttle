export const DRThrottle = (delay: number) => (targetL:any, key:any, descriptor:any) => {
  let last: any
  let deferTimer: any
  const original = descriptor.value
  descriptor.value = function() {
    const now = +new Date()
    if (!last || !(now < last + delay)) {
      last = now
      original.apply(this, arguments)
    } else {
      this.$message.error('请勿重复提交')
    }
  }
  return descriptor
}
