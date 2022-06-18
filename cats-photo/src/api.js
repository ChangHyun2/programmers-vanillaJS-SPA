const BASE_URL =
	"http://127.0.0.1:8080/https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const fetcher = async (url) => {
	try {
		const res = await fetch(`${BASE_URL}${url}`);
		if (res.ok) {
			const data = res.json();
			return data;
		} else {
			throw new Error(res.message);
		}
	} catch (e) {
		throw e;
	}
};

export const getChildrenNodes = (id) => fetcher(id ? `/${id}` : "");
