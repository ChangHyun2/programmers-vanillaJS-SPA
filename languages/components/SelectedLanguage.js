export default function SelectedLanguage($, selectedLanguage) {
	this.render = () => {
		$.innerHTML = `
        <ul>
            ${Array.from(selectedLanguage)
							.map((language) => `<li>${language}</li>`)
							.join("")}
        </ul>
        `;
	};
}
