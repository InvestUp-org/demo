<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import TipTapEditor from '$lib/components/TipTapEditor.svelte';
	import { contentStore } from '$lib/stores/content';
	import type { ContentItem } from '$lib/stores/content';

	const creator_id = $page.params.creator_id || '';
	const editId = $page.url.searchParams.get('id');

	let contentType: 'post' | 'lecture' = 'post';
	let title = '';
	let content = '';
	let thumbnail = '';
	let category = '';
	let status: 'draft' | 'published' = 'draft';
	let chapters: { id: string; title: string; level: 1 | 2 }[] = [];
	let isEditing = false;

	onMount(() => {
		if (editId) {
			const existingContent = contentStore.getById(editId);
			if (existingContent) {
				isEditing = true;
				contentType = existingContent.type;
				title = existingContent.title;
				content = existingContent.content;
				thumbnail = existingContent.thumbnail;
				category = existingContent.category;
				status = existingContent.status;
				chapters = existingContent.chapters || [];
			}
		}
	});

	function handleContentUpdate(newContent: string) {
		content = newContent;
		if (contentType === 'lecture') {
			extractChapters(newContent);
		}
	}

	function extractChapters(htmlContent: string) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlContent, 'text/html');
		const headings = doc.querySelectorAll('h1, h2');

		chapters = Array.from(headings).map((heading, index) => ({
			id: `chapter-${index}`,
			title: heading.textContent || `Chapter ${index + 1}`,
			level: parseInt(heading.tagName.substring(1)) as 1 | 2
		}));
	}

	function saveContent() {
		const contentData = {
			type: contentType,
			title,
			content,
			thumbnail,
			category,
			status,
			chapters: contentType === 'lecture' ? chapters : [],
			creatorId: creator_id
		};

		if (isEditing && editId) {
			contentStore.update(editId, contentData);
			alert('Content updated successfully!');
		} else {
			const newContent = contentStore.create(contentData);
			alert('Content created successfully!');
			goto(`/studio/${creator_id}/editor?id=${newContent.id}`);
		}
	}

	function publishContent() {
		status = 'published';
		saveContent();
	}

	function previewContent() {
		// TODO: Implement preview functionality
		console.log('Preview content:', { title, content, contentType });
	}

	function goBack() {
		goto(`/studio/${creator_id}`);
	}
</script>

<main class="editor">
	<div class="container">
		<header class="editor-header">
			<button class="back-btn" on:click={goBack}>
				← Back to Studio
			</button>
			<h1><strong>{isEditing ? 'Edit Content' : 'Create New Content'}</strong></h1>
			<div class="header-actions">
				<button class="preview-btn" on:click={previewContent}>Preview</button>
				<button class="save-btn" on:click={saveContent}>Save Draft</button>
				<button class="publish-btn" on:click={publishContent}>Publish</button>
			</div>
		</header>

		<div class="editor-layout">
			<!-- Content Form -->
			<section class="content-form">
				<div class="form-row">
					<div class="form-group">
						<label for="content-type">Content Type</label>
						<select id="content-type" bind:value={contentType}>
							<option value="post">Post</option>
							<option value="lecture">Lecture</option>
						</select>
					</div>
					<div class="form-group">
						<label for="status">Status</label>
						<select id="status" bind:value={status}>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" id="title" bind:value={title} placeholder="Enter content title..." />
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="thumbnail">Thumbnail URL</label>
						<input type="url" id="thumbnail" bind:value={thumbnail} placeholder="https://..." />
					</div>
					<div class="form-group">
						<label for="category">Category</label>
						<input type="text" id="category" bind:value={category} placeholder="e.g., Economics, Technology..." />
					</div>
				</div>

				<div class="form-group">
					<label>Content</label>
					<TipTapEditor
						{content}
						placeholder="Start writing your content..."
						onUpdate={handleContentUpdate}
					/>
				</div>
			</section>

			<!-- Sidebar -->
			<aside class="sidebar">
				{#if contentType === 'lecture' && chapters.length > 0}
					<div class="chapters-panel">
						<h3><strong>Chapters</strong></h3>
						<p class="chapters-help">Based on H1 and H2 headings in your content</p>
						<div class="chapters-list">
							{#each chapters as chapter}
								<div class="chapter-item" class:level-2={chapter.level === 2}>
									<span class="chapter-number">
										{chapter.level === 1 ? '📚' : '📖'}
									</span>
									<span class="chapter-title">{chapter.title}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<div class="content-info">
					<h3><strong>Content Info</strong></h3>
					<div class="info-item">
						<strong>Type:</strong> {contentType === 'lecture' ? 'Lecture' : 'Post'}
					</div>
					<div class="info-item">
						<strong>Status:</strong>
						<span class="status" class:draft={status === 'draft'} class:published={status === 'published'}>
							{status === 'draft' ? 'Draft' : 'Published'}
						</span>
					</div>
					{#if contentType === 'lecture'}
						<div class="info-item">
							<strong>Chapters:</strong> {chapters.length}
						</div>
					{/if}
					<div class="info-item">
						<strong>Words:</strong> {content.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length}
					</div>
				</div>

				<div class="quick-actions">
					<h3><strong>Quick Actions</strong></h3>
					<button class="quick-btn" on:click={() => contentType = contentType === 'post' ? 'lecture' : 'post'}>
						Switch to {contentType === 'post' ? 'Lecture' : 'Post'}
					</button>
					<button class="quick-btn" on:click={() => status = status === 'draft' ? 'published' : 'draft'}>
						Mark as {status === 'draft' ? 'Published' : 'Draft'}
					</button>
				</div>
			</aside>
		</div>
	</div>
</main>

<style scoped>
	.editor {
		width: 100%;
		display: flex;
		justify-content: center;
		min-height: 100vh;
		background: var(--white-1);
	}

	.container {
		max-width: var(--max-desk);
		width: 100%;
		padding: var(--space-24) 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	.editor-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-16) var(--space-24);
	}

	.back-btn {
		background: none;
		border: none;
		color: var(--primary);
		cursor: pointer;
		font-weight: var(--font-semi);
		text-decoration: underline;
	}

	.back-btn:hover {
		color: var(--primary-dark);
	}

	.editor-header h1 {
		font-size: var(--font-large);
	}

	.header-actions {
		display: flex;
		gap: var(--space-8);
	}

	.preview-btn, .save-btn, .publish-btn {
		padding: var(--space-8) var(--space-16);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-weight: var(--font-semi);
		transition: all 0.2s;
	}

	.preview-btn {
		background: var(--white-0);
		color: var(--black-2);
		border: var(--border);
	}

	.preview-btn:hover {
		background: var(--white-1);
	}

	.save-btn {
		background: var(--secondary);
		color: var(--white-0);
		border: none;
	}

	.save-btn:hover {
		background: var(--secondary-dark);
	}

	.publish-btn {
		background: var(--primary);
		color: var(--white-0);
		border: none;
	}

	.publish-btn:hover {
		background: var(--primary-dark);
	}

	.editor-layout {
		display: grid;
		grid-template-columns: 1fr 300px;
		gap: var(--space-24);
	}

	.content-form {
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-24);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-16);
	}

	.form-group {
		margin-bottom: var(--space-16);
	}

	.form-group label {
		display: block;
		margin-bottom: var(--space-8);
		font-weight: var(--font-semi);
		color: var(--black-2);
	}

	.form-group input,
	.form-group select {
		width: 100%;
		padding: var(--space-8);
		border: var(--border);
		border-radius: var(--border-r4);
		font-family: var(--font-sans);
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--primary);
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--space-24);
	}

	.chapters-panel,
	.content-info,
	.quick-actions {
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r8);
		padding: var(--space-16);
	}

	.chapters-panel h3,
	.content-info h3,
	.quick-actions h3 {
		margin-bottom: var(--space-12);
		font-size: var(--font-base);
	}

	.chapters-help {
		font-size: var(--font-small);
		color: var(--black-3);
		margin-bottom: var(--space-16);
	}

	.chapters-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.chapter-item {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		padding: var(--space-8);
		border-radius: var(--border-r4);
		background: var(--white-1);
	}

	.chapter-item.level-2 {
		margin-left: var(--space-16);
		background: var(--white-2);
	}

	.chapter-title {
		font-size: var(--font-small);
		font-weight: var(--font-medi);
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-8);
		font-size: var(--font-small);
	}

	.status {
		padding: var(--space-4) var(--space-8);
		border-radius: var(--border-r4);
		font-size: var(--font-small);
		font-weight: var(--font-semi);
	}

	.status.draft {
		background: var(--warning);
		color: var(--black-1);
	}

	.status.published {
		background: var(--success);
		color: var(--white-0);
	}

	.quick-btn {
		width: 100%;
		padding: var(--space-8);
		margin-bottom: var(--space-8);
		background: var(--white-0);
		border: var(--border);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
		transition: background-color 0.2s;
	}

	.quick-btn:hover {
		background: var(--white-1);
	}
</style>