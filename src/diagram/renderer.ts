import { Renderer, type MarkedExtension } from 'marked';

export function markedDiagrams(): MarkedExtension {
	const renderer = new Renderer();
	// @ts-expect-error: Property 'code' does not exist on type 'Renderer'.
	renderer.code = (text: string, code: string) => {
		if (code === 'mermaid') {
			return '<pre class="mermaid">' + text + '</pre>';
		}

		return '<pre><code>' + text + '</code></pre>';
	};

	return {
		renderer,
		async: true,
	};
}
