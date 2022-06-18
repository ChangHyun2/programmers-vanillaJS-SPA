import { getChildrenNodes } from "./api.js";
import BreadCrumb from "./components/BreadCrumb.js";
import Nodes from "./components/Nodes.js";
import Modal from "./components/Modal.js";
import { storage } from "./utils.js";

const rootNodeData = {
	id: "",
	name: "root",
	type: null,
	filePath: null,
	parent: null, // nodeData
};

function ASTNode(data, parent) {
	this.data = data;
	this.children = [];
	this.parent = parent;
}

const head = new ASTNode(rootNodeData);
const tree = {
	head,
	current: head,
	setNodes(nodes) {
		this.current.children = nodes;
	},
	toPrevNode() {
		this.current = this.current.parent;
		this.current.children = storage.get(this.current.data.id);
	},
	toNextNode(id) {
		this.current = this.current.children.find((node) => node.data.id === id);
	},
};

export default function App($p) {
	const $ = document.createElement("main");
	$.className = "App";
	$p.append($);

	let isLoading = false;
	const setIsLoading = (bool) => {
		isLoading = bool;
		this.render();
	};

	const fetchNodes = async (id) => {
		let astNodes = storage.get(id);

		if (!astNodes) {
			try {
				setIsLoading(true);
				const nodes = await getChildrenNodes(id);
				astNodes = nodes.map((node) => new ASTNode(node, tree.current));
				storage.set(id, astNodes);
				setIsLoading(false);
			} catch (e) {
				alert(e.message);
				setIsLoading(false);
			}
		}

		tree.setNodes(astNodes);
	};

	const handleClickNodes = async (e) => {
		if (isLoading) return;

		const $node = e.target.closest(".Node");

		if (!$node) return;

		const id = $node.dataset.id;
		const { type, filePath } = tree.current.children.find(
			(astNode) => astNode.data.id === id
		).data;

		if (type === "FILE") {
			new Modal($, filePath).render();
			return;
		}

		tree.toNextNode(id);
		await fetchNodes(id);
		this.render();
	};

	const handleClickBreadCrumb = (e) => {
		if (isLoading) return;

		const $navItem = e.target.closest("div");
		if (!$navItem) return;
		const id = $navItem.dataset.id;
		console.log(id);

		if (id !== tree.current.id) {
			if (id === "") {
				tree.current = tree.head;
				this.render();
			} else {
				while (tree.current.data.id !== id) {
					tree.toPrevNode();
				}
				this.render();
			}
		}
	};

	this.render = () => {
		$.innerHTML = "";
		new BreadCrumb($, tree, handleClickBreadCrumb).render();
		new Nodes($, tree, isLoading, handleClickNodes).render();
	};

	fetchNodes("");
}
