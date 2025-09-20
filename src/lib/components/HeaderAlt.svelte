<script lang="ts">
	import logo from '$lib/assets/images/logo.svg';
	import logop from '$lib/assets/images/logo_blue.svg';
	import logob from '$lib/assets/images/logo_black.svg';

	export let category;
</script>

<header class="header">
	<div class="container">
		<a href="/" class="header-logo">
			<img src={logop} alt="" />
		</a>
		<div class="header-text">{category}</div>
		<div class="header-action">
			<button class="notification">
				<img src={logob} alt="" />
			</button>
			<button type="button" class="profile">
				<img src={logo} alt="" />
				Name
			</button>
		</div>
	</div>
</header>
