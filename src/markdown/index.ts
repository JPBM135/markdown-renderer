import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import {
	ADDITIONAL_SUPPORTED_ATTRIBUTES,
	HEAD_ONLY_ALLOWED_TAGS,
	MARKDOWN_ALERT_PLUGIN_OPTIONS,
	STRICTLY_ALLOWED_TAGS,
} from './constants.js';
import { uponSanitizeElement } from './hooks.js';
import { HEAD_STYLES } from './styles.js';

const markedInstance = new Marked().use(markedAlert(MARKDOWN_ALERT_PLUGIN_OPTIONS));

function mergeMarkdownHtmlWithHeadStyles(markdownHtml: string) {
	return [
		'<!DOCTYPE html>',
		'<html>',
		'<head>',
		HEAD_STYLES,
		'</head>',
		'<body>',
		markdownHtml,
		'</body>',
		'</html>',
	].join('');
}

function sanitizeHtml(html: string) {
	const dom = new JSDOM('');
	const window = dom.window;
	const DOMPurify = createDOMPurify(window);

	DOMPurify.addHook('uponSanitizeElement', uponSanitizeElement);

	const ALLOWED_TAGS = HEAD_ONLY_ALLOWED_TAGS.concat(STRICTLY_ALLOWED_TAGS);

	return DOMPurify.sanitize(html, {
		ADD_ATTR: ADDITIONAL_SUPPORTED_ATTRIBUTES,
		ALLOWED_TAGS,
		RETURN_DOM_FRAGMENT: false,
		RETURN_DOM: false,
		WHOLE_DOCUMENT: true,
	});
}

export async function parseMarkdown(markdown: string) {
	const markdownHtml = await markedInstance.parse(markdown, {
		gfm: true,
		breaks: true,
	});

	const completeHtml = mergeMarkdownHtmlWithHeadStyles(markdownHtml);
	const sanitizedHtml = sanitizeHtml(completeHtml);

	return sanitizedHtml.trim();
}
