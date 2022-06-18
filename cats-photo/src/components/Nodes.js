import Node from "./Node.js";

export default function Nodes($p, tree, isLoading, handleClickNodes) {
	const $ = document.createElement("div");
	$.className = "Nodes";
	$p.append($);

	$.addEventListener("click", handleClickNodes);

	this.render = () => {
		$.innerHTML = "";

		if (isLoading) {
			$.innerHTML = `isLoading`;
			return;
		}

		const nodes =
			tree.current.data.id === ""
				? tree.current.children
				: [{ id: "", name: "", type: "TYPE" }, ...tree.current.children];

		nodes.forEach((astNode) => {
			new Node($, astNode).render();
		});
	};
}
