import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		console.error("Request error", error);
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// console.log(response.data);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			console.warn("[401] Access token je istekao, refreshing...");
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");

				if (!refreshToken) {
					throw new Error("Nema refresh tokena");
				}
				const { data } = await axios.post(
					"http://localhost:3000/auth/refresh",
					{ token: refreshToken }
				);

				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);

				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				console.log;
				("Token osvezen, ponavljam zahtev");
				return api(originalRequest);
			} catch (refreshError) {
				console.error("Refresh token nevazeci");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");

				window.location.href = "/login";

				return Promise.reject(refreshError);
			}
		}
		if (error.response?.status === 403) {
			console.error("[403] Nemaš dozvolu za ovu akciju!");
			alert("Nemaš pristup ovoj resursu.");
		}

		if (error.response?.status === 404) {
			console.error("[404] Resurs nije pronađen!");
		}

		if (error.response?.status === 500) {
			console.error("[500] Server error!");
			alert("Problem na serveru. Pokušajte kasnije.");
		}

		if (!error.response) {
			console.error("[NETWORK ERROR] Server ne radi ili nema interneta");
			alert(
				"Ne mogu da se povežem sa serverom. Proverite internet konekciju."
			);
		}

		if (error.code === "ECONNABORTED") {
			console.error("[TIMEOUT] Server ne odgovara");
			alert("Server sporo odgovara. Pokušajte ponovo.");
		}

		console.error("[ERROR]", {
			status: error.response?.status,
			message: error.response?.data?.message || error.message,
			url: error.config?.url,
		});

		return Promise.reject(error);
	}
);

export default api;
