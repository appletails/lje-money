import service from '@/common/http'

export function getSeven() {
	return service.get('http://81.68.171.190:83/seven')
}