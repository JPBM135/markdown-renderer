import hljs from 'highlight.js';

function setImageAttributes(node: Element) {
	node.setAttribute('loading', 'lazy');
}

function setAnchorAttributes(node: Element) {
	node.setAttribute('target', '_blank');
	node.setAttribute('rel', 'noopener noreferrer');
}

function highlightCodeElement(node: Element) {
	if (!node.parentElement || node.parentElement.tagName.toLowerCase() !== 'pre') {
		return;
	}

	hljs.highlightElement(node as HTMLElement);
}

function sanitizeLinkAndStyleElements(node: Element) {
	const areInsideHead = node.closest('head');
	if (!areInsideHead) {
		node.remove();
	}
}

export function uponSanitizeElement(node: Element) {
	if (!node.tagName) {
		return;
	}

	if (Reflect.has(node, 'removeAttribute')) {
		// Remove all inline styles
		node.removeAttribute('style');
	}

	switch (node.tagName.toLowerCase()) {
		case 'img':
			setImageAttributes(node);
			break;
		case 'a':
			setAnchorAttributes(node);
			break;
		case 'code':
			highlightCodeElement(node);
			break;
		case 'link':
			sanitizeLinkAndStyleElements(node);
			break;
		case 'style':
			sanitizeLinkAndStyleElements(node);
			break;
	}
}
