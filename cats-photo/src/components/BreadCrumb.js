export default function BreadCrumb($p, tree, handleClickBreadCrumb) {
	const $ = document.createElement("nav");
	$.className = "BreadCrumb";
	$p.append($);

	$.addEventListener("click", handleClickBreadCrumb);

	const nodeToHTML = (node) => {
		return `<div data-id=${node.data.id}>${node.data.name}</div>`;
	};

	this.render = () => {
		const nodes = [];
		let current = tree.current;

		while (current) {
			nodes.push(current);
			current = current.parent;
		}

		$.innerHTML = `
            ${nodes.reverse().map(nodeToHTML).join("")}
        `;
	};
}
