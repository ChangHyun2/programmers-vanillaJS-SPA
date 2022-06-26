import { getLanguages } from "../api.js";
import { removeAllEventListeners } from "../utils.js";

export default function SearchInput(
	_$,
	getSuggestion,
	setSuggestion,
	addSelectedLanguage
) {
	const $ = removeAllEventListeners(_$);

	let timer;
	const SUGGEST_DELAY = 300;

	$.addEventListener("input", (e) => {
		if (e.target.value === "") {
			setSuggestion(null);
			return;
		}
		suggestLanguages(e.target.value);
	});

	$.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	$.addEventListener("keydown", (e) => {
		const key = e.key;

		const suggestion = getSuggestion();
		if (!suggestion) {
			return;
		}

		const { cursor, languages, input } = suggestion;

		if (key === "ArrowUp" || key === "ArrowDown") {
			const dir = key === "ArrowUp" ? -1 : 1;
			const step = 1;

			let nextCursor = (cursor + dir * step) % languages.length;

			if (nextCursor === -1) {
				nextCursor = languages.length - 1;
			}

			setSuggestion({ ...suggestion, cursor: nextCursor });
		}

		if (key === "Enter") {
			const selected = languages[cursor];
			alert(selected);
			addSelectedLanguage(selected);
		}
	});

	const suggestLanguages = (value) => {
		clearTimeout(timer);

		timer = setTimeout(async () => {
			const languages = await getLanguages(value);

			setSuggestion({ languages, cursor: 0, input: value });
		}, SUGGEST_DELAY);
	};

	this.render = () => {
		$.innerHTML = `
            <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=""/>
        `;
	};
}
