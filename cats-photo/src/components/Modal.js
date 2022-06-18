export default function Modal($p, filePath) {
	const $ = document.createElement("div");
	$.className = "Modal Loading";
	$.tabIndex = -1;
	$p.append($);

	let isLoading = true;
	const setIsLoading = (bool) => {
		isLoading = bool;
		this.render();
	};

	$.addEventListener("keydown", (e) => {
		const key = e.key;

		if (key === "Escape") {
			this.close();
		}
	});

	$.addEventListener("click", (e) => {
		const $content = e.target.closest(".content");

		if (!$content) {
			this.close();
		}
	});

	const imgPath = (filePath) =>
		`https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${filePath}`;

	this.render = () => {
		if (isLoading) {
			const img = document.createElement("img");
			img.src = imgPath(filePath);
			img.onload = () => {
				console.log("img onload");
				setIsLoading(false);
			};

			$.innerHTML = `
                <div class="content">
                    <img src="./assets/nyan-cat.png">
                </div>
            `;
			return;
		}

		$.className = "Modal ImageViewer";
		$.innerHTML = `
            <div class="content">
                <img src="${imgPath(filePath)}">
            </div>
        `;
		$.querySelector("img").style.width = "500";
		$.querySelector("img").style.height = "500";
		$.focus();
	};

	this.close = () => {
		$.remove();
	};
}
