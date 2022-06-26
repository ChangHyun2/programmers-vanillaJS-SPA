export const removeAllEventListeners = ($) => {
	const cloned = $.cloneNode(true);
	$.parentNode.replaceChild(cloned, $);
	return cloned;
};
