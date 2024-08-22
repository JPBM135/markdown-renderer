import cron from 'node-cron';

export interface MarkdownCacheItem {
	createdAt: number;
	html: string;
	id: string;
}

const SIX_HOURS_IN_MS = 1_000 * 60 * 60 * 6;

export class MarkdownCache {
	private static instance: MarkdownCache | null = null;

	public static getInstance(): MarkdownCache {
		return this.instance ?? (this.instance = new MarkdownCache());
	}

	private constructor() {
		this.initJobs();
	}

	private initJobs() {
		cron.schedule('0 * * * *', () => {
			console.log(`[Cron] Running cache cleanup`);
			const now = Date.now();

			for (const [id, { createdAt }] of this.cache) {
				if (now - createdAt > SIX_HOURS_IN_MS) {
					console.log(`[Cron] Deleting cache entry with ID: ${id}`);
					this.cache.delete(id);
				}
			}
		});
	}

	private cache = new Map<
		string,
		{
			createdAt: number;
			html: string;
			id: string;
		}
	>();

	public get size(): number {
		return this.cache.size;
	}

	public get(id: string): MarkdownCacheItem | undefined {
		return this.cache.get(id);
	}

	public set(id: string, html: string): void {
		this.cache.set(id, {
			createdAt: Date.now(),
			html,
			id,
		});
	}
}
