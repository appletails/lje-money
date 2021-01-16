import service from '@/common/http'

export function getSeven() {
	return service.get('http://www.crean.top:83/seven')
}