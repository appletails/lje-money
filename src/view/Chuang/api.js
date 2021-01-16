import service from '@/common/http'

export function getChuang() {
	return service.get('http://www.crean.top:83/chuang')
}