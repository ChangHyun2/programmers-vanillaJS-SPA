const BASE_URL =
	"https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const fetcher = async (path) => {
	try {
		const res = await fetch(`${BASE_URL}${path}`);

		if (res.ok) {
			return res.json();
		} else {
			throw new Error();
		}
	} catch (e) {
		alert(e.message);
	}
};

export const getLanguages = (keyword) =>
	fetcher("/languages?" + new URLSearchParams({ keyword }));
