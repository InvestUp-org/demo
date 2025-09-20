<script lang="ts">
	import logo from '$lib/assets/images/logo.svg';
	import logop from '$lib/assets/images/logo_blue.svg';
	import logob from '$lib/assets/images/logo_black.svg';
</script>

<header class="header">
	<div class="container">
		<a href="/" class="header-logo">
			<img src={logop} alt="" />
		</a>
		<div class="header-action">
			<form action="" method="get" class="search">
				<input type="text" name="" id="" />
				<button type="submit">
					<img src={logob} alt="" />
				</button>
			</form>
            <a href="/" class="signin">로그인</a>
		</div>
	</div>
</header>
