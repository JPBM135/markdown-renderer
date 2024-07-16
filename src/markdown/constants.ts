import type { Options } from 'marked-alert';

export const MARKDOWN_ALERT_PLUGIN_OPTIONS: Options = {
	variants: [
		{
			type: 'note',
			icon: '<span class="material-symbols-outlined color-markdown-alerts-note">info</span>',
		},
		{
			type: 'tip',
			icon: '<span class="material-symbols-outlined color-markdown-alerts-tip">lightbulb</span>',
		},
		{
			type: 'important',
			icon: '<span class="material-symbols-outlined color-markdown-alerts-important">feedback</span>',
		},
		{
			type: 'warning',
			icon: '<span class="material-symbols-outlined color-markdown-alerts-warning">warning</span>',
		},
		{
			type: 'caution',
			icon: '<span class="material-symbols-outlined color-markdown-alerts-caution">report</span>',
		},
	],
};

export const ADDITIONAL_SUPPORTED_ATTRIBUTES = ['target', 'rel', 'loading'];

export const HEAD_ONLY_ALLOWED_TAGS = ['link', 'style'];

export const STRICTLY_ALLOWED_TAGS = [
	'span',
	'cite',
	'em',
	'strong',
	'i',
	'b',
	'sub',
	'sup',
	'mark',
	'del',
	'a',
	'code',
	'pre',
	'br',
	'hr',
	'img',
	'blockquote',
	'ul',
	'ol',
	'li',
	'table',
	'thead',
	'tbody',
	'tr',
	'th',
	'td',
	'dl',
	'dt',
	'dd',
	'details',
	'summary',
	'p',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'div',
];
