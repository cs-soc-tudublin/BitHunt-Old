<script lang="ts">
    import type { PageData, ActionData } from './$types';
    
    export let data: PageData;
    export let form: ActionData;

    let disabled = true;
    let isActive = false;

    if(data.event.active == true) {
        isActive = true;
    }

    console.log(isActive)

    export let toggleEdit = () => {
        disabled = !disabled;
    }

</script>

<head>
    <title>BitHunt [🛡️] - View {data.event.name}</title>
</head>

<h1 class="title large">{data.event.name}</h1>

<div class="buttons">
    <button class="cspp" on:click={() => window.location.href = "/admin/events"}>
        <i class="fa fa-arrow-left"></i>
        Back
    </button>

    <button class="cspp" on:click={() => toggleEdit()}>
        <i class="fa fa-pencil"></i>
        Edit {data.event.name}
    </button>
</div>

<form method="post">
    <input type="hidden" name="id" value="{data.event.id}">

    <label for="name">
        Name
        <span class="required">*</span>
    </label>
    <input type="text" name="name" id="name" value="{data.event.name}" {disabled} required>

    <label for="date">
        Date
        <span class="required">*</span>
    </label>
    <input type="date" name="date" id="date" value="{data.event.date}" {disabled} required>

    <label for="location">
        Location
        <span class="required">*</span>
    </label>
    <input type="text" name="location" id="location" value="{data.event.location}" {disabled} required>

    <label for="description">
        Description
        <span class="required">*</span>
    </label>
    <textarea name="description" id="description" {disabled} required>{data.event.description}</textarea>

    <label for="prize">
        Prize
        <span class="required">*</span>
    </label>
    <input type="text" name="prize" id="prize" value="{data.event.prize}" {disabled} required>

    <label for="prizecount">
        Prize Count
        <span class="required">*</span>
    </label>
    <input type="number" name="prizecount" id="prizecount" value="{data.event.prizecount}" {disabled} required>

    <label for="status">
        Status
        <span class="required">*</span>
    </label>
    <select name="status" id="status" {disabled} required>
        <option value="active" selected={isActive}>Active</option>
        <option value="inactive" selected={!isActive}>Inactive</option>
    </select>

    <button class="cspp" {disabled}>
        <i class="fa fa-calendar-check-o"></i>
        Save
    </button>

</form>