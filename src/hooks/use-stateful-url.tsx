"use client"

import { useParams, usePathname } from "next/navigation"
import { useClientSearchParams } from "./use-client-search-params"

const useStatefulUrl = () => {
  const pathname = usePathname()
  const getDynamicParams = useParams()
  const searchParams = useClientSearchParams()

  const getCurrentPathname = () => pathname

  const getCurrentPathnameWithQuery = () => {
    const query = searchParams.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  const addQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.set(key, value)
    return `${pathname}?${params.toString()}`
  }

  const addQueryParams = (queries: Array<{ key: string; value: string }>) => {
    const params = new URLSearchParams(searchParams.toString())

    queries.forEach(query => {
      const { key, value } = query

      params.delete(key)
      params.set(key, value)
    })

    return `${pathname}?${params.toString()}`
  }

  const getQueryParam = (key: string) => searchParams.get(key)

  const getAllQueryParams = () => {
    const entries: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      entries[key] = value
    })
    return entries
  }

  const getAllQueryParamsToString = () => {
    const params = new URLSearchParams(searchParams.toString())
    return params.toString()
  }

  const removeQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    return `${pathname}?${params.toString()}`
  }

  const removeQueryFromString = (queries: string, key: string) => {
    const queryInArray = queries.split("&")?.filter((item: string) => item?.split("=")[0] !== key)

    return queryInArray.join("&")
  }

  const removeQueriesFromString = (queryString: string, queries: Array<string>) => {
    const queryInArray = queryString
      .split("&")
      ?.filter((item: string) => !queries.includes(item?.split("=")[0]))

    return queryInArray.join("&")
  }

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.set(key, value)
    return `${pathname}?${params.toString()}`
  }

  const updateQueryParams = (queryParams: Array<{ key: string; value: string }>) => {
    const params = new URLSearchParams(searchParams.toString())

    queryParams.forEach((param: { key: string; value: string }) => {
      const { key, value } = param
      params.delete(key)
      params.set(key, value)
    })

    return `${pathname}?${params.toString()}`
  }

  const setPathnameAndReturnFullUrl = (newPathname: string) => {
    const query = searchParams.toString()
    const fullUrl = query ? `${newPathname}?${query}` : newPathname
    return fullUrl
  }

  const updatePathPortionRightOfPath = (slicerPath: string, rightPath: string) => {
    const currentPath = getCurrentPathname()
    const leftPath = currentPath.split(slicerPath)[0]

    const params = new URLSearchParams(searchParams.toString())

    return `${leftPath}${rightPath}${params.toString() ? `?${params.toString()}` : ""}`
  }

  const updateDynamicParamAndReturnFullURL = (dynamicQueryKey: string, value: string) => {
    const valueToBeReplaced = getDynamicParams[dynamicQueryKey]

    if (!valueToBeReplaced) {
      return getCurrentPathnameWithQuery()
    }

    const updatedPathname = pathname.replaceAll(`${valueToBeReplaced}`, value)

    return setPathnameAndReturnFullUrl(updatedPathname)
  }

  return {
    searchParams,
    addQueryParam,
    getQueryParam,
    addQueryParams,
    getDynamicParams,
    removeQueryParam,
    updateQueryParam,
    updateQueryParams,
    getAllQueryParams,
    getCurrentPathname,
    removeQueryFromString,
    getCurrentPathnameWithQuery,
    setPathnameAndReturnFullUrl,
    updatePathPortionRightOfPath,
    updateDynamicParamAndReturnFullURL,
    getAllQueryParamsToString,
    removeQueriesFromString,
  }
}

export default useStatefulUrl
