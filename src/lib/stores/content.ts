import { writable } from 'svelte/store';

export interface ContentItem {
	id: string;
	type: 'lecture' | 'post';
	title: string;
	content: string;
	thumbnail: string;
	category: string;
	status: 'draft' | 'published';
	chapters?: Chapter[];
	createdAt: string;
	updatedAt: string;
	creatorId: string;
}

export interface Chapter {
	id: string;
	title: string;
	level: 1 | 2;
}

const mockContent: ContentItem[] = [
	{
		id: '1',
		type: 'lecture',
		title: '30분만에 끝내는 경제 뉴스 읽기',
		content: '<h1>경제 뉴스의 기초</h1><p>경제 뉴스를 읽는 방법을 배워봅시다.</p><h2>핵심 용어 이해하기</h2><p>GDP, 인플레이션 등의 용어를 알아봅시다.</p>',
		thumbnail: '/assets/example/ex1.jpg',
		category: 'Economics',
		status: 'published',
		chapters: [
			{ id: 'ch1', title: '경제 뉴스의 기초', level: 1 },
			{ id: 'ch2', title: '핵심 용어 이해하기', level: 2 }
		],
		createdAt: '2025-09-10',
		updatedAt: '2025-09-10',
		creatorId: 'creator1'
	},
	{
		id: '2',
		type: 'post',
		title: '2025년 경제 전망과 투자 전략',
		content: '<p>2025년 경제 전망에 대해 분석해보겠습니다.</p>',
		thumbnail: '/assets/example/ex5.jpg',
		category: 'Investment',
		status: 'published',
		createdAt: '2025-09-10',
		updatedAt: '2025-09-10',
		creatorId: 'creator1'
	},
	{
		id: '3',
		type: 'post',
		title: '워렌 버핏처럼 생각하기: 투자 철학 입문',
		content: '<p>워렌 버핏의 투자 철학을 알아보겠습니다.</p>',
		thumbnail: '/assets/example/ex9.jpg',
		category: 'Investment',
		status: 'draft',
		createdAt: '2025-09-10',
		updatedAt: '2025-09-10',
		creatorId: 'creator1'
	}
];

function createContentStore() {
	const { subscribe, set, update } = writable<ContentItem[]>(mockContent);

	return {
		subscribe,

		// Get all content for a creator
		getByCreator: (creatorId: string) => {
			return mockContent.filter(item => item.creatorId === creatorId);
		},

		// Get content by ID
		getById: (id: string) => {
			return mockContent.find(item => item.id === id);
		},

		// Create new content
		create: (content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>) => {
			const newItem: ContentItem = {
				...content,
				id: Date.now().toString(),
				createdAt: new Date().toISOString().split('T')[0],
				updatedAt: new Date().toISOString().split('T')[0]
			};

			update(items => [...items, newItem]);
			return newItem;
		},

		// Update existing content
		update: (id: string, updates: Partial<ContentItem>) => {
			update(items =>
				items.map(item =>
					item.id === id
						? { ...item, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
						: item
				)
			);
		},

		// Delete content
		delete: (id: string) => {
			update(items => items.filter(item => item.id !== id));
		},

		// Filter by type
		filterByType: (type: 'lecture' | 'post', creatorId: string) => {
			return mockContent.filter(item => item.type === type && item.creatorId === creatorId);
		},

		// Filter by status
		filterByStatus: (status: 'draft' | 'published', creatorId: string) => {
			return mockContent.filter(item => item.status === status && item.creatorId === creatorId);
		}
	};
}

export const contentStore = createContentStore();