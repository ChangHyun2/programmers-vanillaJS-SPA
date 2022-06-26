import { removeAllEventListeners } from "../utils.js";

export default function Suggestion(_$, suggestion, addSelectedLanguage) {
	const $ = removeAllEventListeners(_$);

	this.render = () => {
		if (suggestion === null) {
			$.innerHTML = "<ul></ul>";
			return;
		}

		$.addEventListener("click", (e) => {
			if (e.target.closest("li")) {
				const language = e.target.dataset.language;
				alert(language);
				addSelectedLanguage(language);
			}
		});

		const { languages, cursor, input } = suggestion;

		$.innerHTML = `
            <ul>
                ${languages
									.map((language, i) => {
										const attributes = `data-language="${language}" ${
											cursor === i ? 'class="Suggestion__item--selected"' : ""
										}`;

										const startAt = language.toLowerCase().indexOf(input);
										const endAt = startAt + input.length;

										const pre = language.slice(0, startAt);
										const mid = language.slice(startAt, endAt);
										const post = language.slice(endAt);
										const matchedHTML = (mid) =>
											`<span class="Suggestion__item--matched">${mid}</span>`;

										let innerHTML;

										if (post && pre) {
											innerHTML = `${pre}${matchedHTML(mid)}${post}`;
										} else {
											innerHTML = pre
												? `${pre}${matchedHTML(mid)}`
												: `${matchedHTML(mid)}${post}`;
										}

										return `<li ${attributes}>
                ${innerHTML}
            </li>`;
									})
									.join("")}
            </ul>
        `;
	};
}
