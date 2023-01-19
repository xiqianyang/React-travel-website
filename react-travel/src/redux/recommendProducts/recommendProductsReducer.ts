interface RecommendProductsState {
    productList: any[];
    loading: boolean;
    error: string | null;
}

const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: [],
};

export default (state = defaultState, action) => {
    return state;
}