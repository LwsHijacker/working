import { useCallback, useEffect, useRef } from "react"

export interface DebounceRefType {
	fn: Function,
	timer?: NodeJS.Timeout
}

export type DebouncePropsType = [Function, number, Array<any>]


const useDebounce = (...[fn, debounce, deps]: DebouncePropsType) => {
	const { current } = useRef<DebounceRefType>({ fn })


	useEffect(() => {
		current.fn = fn
	}, [current, fn])

	return useCallback(
		function (this: any, ...args: any[]) {
			if (current.timer) {
				clearTimeout(current.timer)
				delete current.timer
			}

			current.timer = setTimeout(() => {
				current.fn.apply(this, args)
			}, debounce);
		},
		// eslint-disable-next-line
		[debounce, current, ...deps],
	)

}

export default useDebounce
