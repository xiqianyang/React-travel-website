export const FETCH_RECOMMEND_PRODUCTS_START =
    "FETCH_RECOMMEND_PRODUCTS_START";//正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS";//推荐调用api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL =
    "FETCH_RECOMMEND_PRODUCTS_FAIL";//推荐调用api调用失败

interface FetchReommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchReommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchReommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductAction =
    | FetchReommendProductStartAction
    | FetchReommendProductSuccessAction
    | FetchReommendProductFailAction;