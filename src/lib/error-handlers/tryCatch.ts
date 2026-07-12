/**
 * type T is for Type of Data which is expected to be dynamic and passed when the tryCatch is expected to be invoked
 * type F is for type of Error which is expected to be thrown by system when the tryCatch is expected to be invoked
 */

type Success<T> = {
  data: T
  error: null
}

type Failure<F> = {
  data: null
  error: F
}

type Result<T, F = Error> = Success<T> | Failure<F>

/**
 * @param promise
 * @returns { data: T | null, error: F | null}
 */
export const tryCatch = async <T, F = Error>(promise: Promise<T>): Promise<Result<T, F>> => {
  try {
    const data = await promise
    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error as F,
    }
  }
}
