import axiosInstance from "../Context/AuthContext";

const fetchProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
}
export default fetchProducts;