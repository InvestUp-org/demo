<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import { Table } from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableHeader from '@tiptap/extension-table-header';
	import TableCell from '@tiptap/extension-table-cell';
	import Link from '@tiptap/extension-link';
	import Youtube from '@tiptap/extension-youtube';

	export let content = '';
	export let placeholder = 'Start writing...';
	export let onUpdate: (content: string) => void = () => {};

	let element: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Image.configure({
					inline: true,
					allowBase64: true,
				}),
				Table.configure({
					resizable: true,
				}),
				TableRow,
				TableHeader,
				TableCell,
				Link.configure({
					openOnClick: false,
					autolink: true,
				}),
				Youtube.configure({
					width: 480,
					height: 320,
				}),
			],
			content: content,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				onUpdate(html);
			},
		});

		return () => {
			editor?.destroy();
		};
	});

	function addImage() {
		const url = window.prompt('Image URL');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	}

	function addVideo() {
		const url = window.prompt('YouTube URL');
		if (url) {
			editor.chain().focus().setYoutubeVideo({ src: url }).run();
		}
	}

	function addLink() {
		const url = window.prompt('Link URL');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	}

	function addTable() {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
	}

	function toggleBold() {
		editor.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor.chain().focus().toggleItalic().run();
	}

	function toggleHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
		editor.chain().focus().toggleHeading({ level }).run();
	}

	function toggleBulletList() {
		editor.chain().focus().toggleBulletList().run();
	}

	function toggleOrderedList() {
		editor.chain().focus().toggleOrderedList().run();
	}

	function undo() {
		editor.chain().focus().undo().run();
	}

	function redo() {
		editor.chain().focus().redo().run();
	}
</script>

<div class="tiptap-editor">
	{#if editor}
		<div class="toolbar">
			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={editor.isActive('bold')}
					on:click={toggleBold}
				>
					<strong>B</strong>
				</button>
				<button
					class="toolbar-btn"
					class:active={editor.isActive('italic')}
					on:click={toggleItalic}
				>
					<em>I</em>
				</button>
			</div>

			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={editor.isActive('heading', { level: 1 })}
					on:click={() => toggleHeading(1)}
				>
					H1
				</button>
				<button
					class="toolbar-btn"
					class:active={editor.isActive('heading', { level: 2 })}
					on:click={() => toggleHeading(2)}
				>
					H2
				</button>
				<button
					class="toolbar-btn"
					class:active={editor.isActive('heading', { level: 3 })}
					on:click={() => toggleHeading(3)}
				>
					H3
				</button>
			</div>

			<div class="toolbar-group">
				<button
					class="toolbar-btn"
					class:active={editor.isActive('bulletList')}
					on:click={toggleBulletList}
				>
					• List
				</button>
				<button
					class="toolbar-btn"
					class:active={editor.isActive('orderedList')}
					on:click={toggleOrderedList}
				>
					1. List
				</button>
			</div>

			<div class="toolbar-group">
				<button class="toolbar-btn" on:click={addImage}>
					🖼️ Image
				</button>
				<button class="toolbar-btn" on:click={addVideo}>
					🎥 Video
				</button>
				<button class="toolbar-btn" on:click={addLink}>
					🔗 Link
				</button>
				<button class="toolbar-btn" on:click={addTable}>
					📋 Table
				</button>
			</div>

			<div class="toolbar-group">
				<button class="toolbar-btn" on:click={undo}>
					↶ Undo
				</button>
				<button class="toolbar-btn" on:click={redo}>
					↷ Redo
				</button>
			</div>
		</div>
	{/if}

	<div class="editor-content" bind:this={element}></div>
</div>

<style>
	.tiptap-editor {
		border: var(--border);
		border-radius: var(--border-r8);
		overflow: hidden;
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-8);
		padding: var(--space-12);
		background: var(--white-1);
		border-bottom: var(--border);
	}

	.toolbar-group {
		display: flex;
		gap: var(--space-4);
	}

	.toolbar-btn {
		padding: var(--space-4) var(--space-8);
		border: var(--border);
		background: var(--white-0);
		border-radius: var(--border-r4);
		cursor: pointer;
		font-size: var(--font-small);
		transition: all 0.2s;
	}

	.toolbar-btn:hover {
		background: var(--white-2);
	}

	.toolbar-btn.active {
		background: var(--primary);
		color: var(--white-0);
		border-color: var(--primary);
	}

	.editor-content {
		min-height: 400px;
		padding: var(--space-16);
	}

	:global(.ProseMirror) {
		outline: none;
		min-height: 400px;
		font-family: var(--font-sans);
		line-height: var(--font-l150);
	}

	:global(.ProseMirror h1) {
		font-size: var(--font-xxlarge);
		font-weight: var(--font-bold);
		margin: var(--space-16) 0 var(--space-8) 0;
	}

	:global(.ProseMirror h2) {
		font-size: var(--font-xlarge);
		font-weight: var(--font-bold);
		margin: var(--space-16) 0 var(--space-8) 0;
	}

	:global(.ProseMirror h3) {
		font-size: var(--font-large);
		font-weight: var(--font-bold);
		margin: var(--space-12) 0 var(--space-8) 0;
	}

	:global(.ProseMirror p) {
		margin: var(--space-8) 0;
	}

	:global(.ProseMirror ul, .ProseMirror ol) {
		margin: var(--space-8) 0;
		padding-left: var(--space-24);
	}

	:global(.ProseMirror li) {
		margin: var(--space-4) 0;
	}

	:global(.ProseMirror img) {
		max-width: 100%;
		height: auto;
		border-radius: var(--border-r4);
	}

	:global(.ProseMirror table) {
		border-collapse: collapse;
		margin: var(--space-16) 0;
		width: 100%;
	}

	:global(.ProseMirror table td, .ProseMirror table th) {
		border: var(--border);
		padding: var(--space-8);
		vertical-align: top;
	}

	:global(.ProseMirror table th) {
		background: var(--white-1);
		font-weight: var(--font-semi);
	}

	:global(.ProseMirror a) {
		color: var(--primary);
		text-decoration: underline;
	}

	:global(.ProseMirror a:hover) {
		color: var(--primary-dark);
	}

	:global(.ProseMirror .youtube-wrapper) {
		text-align: center;
		margin: var(--space-16) 0;
	}
</style>