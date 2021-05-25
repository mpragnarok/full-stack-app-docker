import http from '../common/http';

const OrderService = {
    getAll: (patientId, filters) => {
        const { page, limit, sort } = filters;
        return http
            .get(`/orders/${patientId}?page=${page}&limit=${limit}&sort=${sort}`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
    create: (patientId, data) => {
        return http
            .post(`/orders/${patientId}`, data)
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
    update: (id, data) => {
        return http
            .put(`/orders/${id}`, data)
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
};
export default OrderService;
