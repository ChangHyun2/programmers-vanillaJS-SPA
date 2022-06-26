import SearchInput from "./components/SearchInput.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
import Suggestion from "./components/Suggestion.js";

export default function App($) {
	let suggestion = null;
	const getSuggestion = () => suggestion;
	const setSuggestion = (data) => {
		suggestion = data;
		renderSuggestion();
	};

	let selectedLanguage = new Set();
	const SELECTED_CACHE_MAX_SIZE = 5;

	const addSelectedLanguage = (language) => {
		console.log(language, selectedLanguage);

		if (selectedLanguage.has(language)) {
			selectedLanguage.delete(language);
			selectedLanguage.add(language);
		} else if (selectedLanguage.size === SELECTED_CACHE_MAX_SIZE) {
			selectedLanguage.delete(selectedLanguage.values().next().value);
			selectedLanguage.add(language);
		} else {
			selectedLanguage.add(language);
		}

		renderSelectedLanguage();
	};

	const renderSearchInput = () => {
		const $searchInput = $.querySelector(".SearchInput");
		new SearchInput(
			$searchInput,
			getSuggestion,
			setSuggestion,
			addSelectedLanguage
		).render();
	};

	const renderSuggestion = () => {
		const $suggestion = $.querySelector(".Suggestion");
		new Suggestion($suggestion, suggestion, addSelectedLanguage).render();
	};

	const renderSelectedLanguage = () => {
		const $selectedLanguage = $.querySelector(".SelectedLanguage");
		new SelectedLanguage($selectedLanguage, selectedLanguage).render();
	};

	this.render = () => {
		$.innerHTML = `
            <div class="SelectedLanguage"></div>
            <form class="SearchInput"></form>
            <div class="Suggestion"></div>
        `;

		renderSearchInput();
		renderSuggestion();
		renderSelectedLanguage();

		$.querySelector("input").focus();
	};
}
