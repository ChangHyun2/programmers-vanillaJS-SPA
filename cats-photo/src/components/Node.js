export default function Node($p, astNode) {
	const $ = document.createElement("div");
	$.className = "Node";
	$.dataset.id = astNode.data.id;
	$p.append($);

	const { data } = astNode;

	const imagePath = () => `./assets/${data.type.toLowerCase()}.png`;

	this.render = () => {
		$.innerHTML = `
            <img src="${imagePath()}".png>
            ${data.type === "PREV" ? "" : `<div>${data.name}</div>`}
        `;
	};
}
