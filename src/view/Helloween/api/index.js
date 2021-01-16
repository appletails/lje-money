import service from '@/common/http'

export function getHelloween() {
  return service.get('http://www.crean.top:83/helloween')
}
