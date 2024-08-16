import createDOMPurify from 'dompurify';
import { minify } from 'html-minifier';
import { JSDOM } from 'jsdom';
import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import {
	ADDITIONAL_SUPPORTED_ATTRIBUTES,
	HEAD_ONLY_ALLOWED_TAGS,
	MARKDOWN_ALERT_PLUGIN_OPTIONS,
	STRICTLY_ALLOWED_TAGS,
} from './constants.js';
import { uponSanitizeElementFactory } from './hooks.js';
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

function sanitizeHtml(html: string, theme: 'dark' | 'light' = 'light') {
	const dom = new JSDOM('');
	const window = dom.window;
	const DOMPurify = createDOMPurify(window);

	DOMPurify.addHook('uponSanitizeElement', uponSanitizeElementFactory(theme));

	const ALLOWED_TAGS = HEAD_ONLY_ALLOWED_TAGS.concat(STRICTLY_ALLOWED_TAGS);

	return DOMPurify.sanitize(html, {
		ADD_ATTR: ADDITIONAL_SUPPORTED_ATTRIBUTES,
		ALLOWED_TAGS,
		RETURN_DOM_FRAGMENT: false,
		RETURN_DOM: false,
		WHOLE_DOCUMENT: true,
	});
}

function minifyHtml(html: string) {
	return minify(html, {
		collapseWhitespace: true,
		removeComments: true,
		minifyCSS: true,
	});
}

export async function parseMarkdown(markdown: string, theme: 'dark' | 'light' = 'light') {
	const markdownHtml = await markedInstance.parse(markdown, {
		gfm: true,
		breaks: true,
	});

	const completeHtml = mergeMarkdownHtmlWithHeadStyles(markdownHtml);
	const sanitizedHtml = sanitizeHtml(completeHtml, theme);
	const minifiedHtml = minifyHtml(sanitizedHtml);
	return minifiedHtml.trim();
}
