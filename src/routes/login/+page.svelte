<script lang="ts">
    import type { ActionData } from './$types';

    export let form: ActionData;

    import Toasts from "$lib/toasts/Toasts.svelte";
    import { addToast } from "$lib/toasts/store.js";

    if(form?.status == 500){
        addToast({
            message: form.message,
            type: "error",
            dismissible: true,
            timeout: 5000
        });
    }
</script>

<Toasts />

<head>
    <title>BitHunt - Log in</title>
</head>

<h1 class="title large">Log Back In</h1>

<form method="post">

    <label for="studentid">
        Student ID
        <span class="required">*</span>
    </label>
    <input type="text" name="studentid" id="studentid" placeholder="C12345678" required>

    <button class="cspp form-element">
        <i class="fa fa-user"></i>
        Log In
    </button>
</form>