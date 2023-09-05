<script lang="ts">
    import type { FormData } from './$types';
    
    export let form: FormData;

    export let clueView = (uuid: string) => {
        window.location.href = `/view/clue/${uuid}`;
    },
    clueRemove = (uuid: string) => {
        let confirmation = confirm("Are you sure you want to remove this clue?");

        if (confirmation){
            window.location.href = `/remove/clue/${uuid}`;
        }
    },
    clueAdd = () => {
        window.location.href = `/add/clue`;
    }
</script>

<head>
    <title>BitHunt - Admin</title>
</head>

<h1 class="title large">Admin</h1>

<!-- Login -->

{#if form == null}
    <form method="post">
        <label for="password">
            Password
            <span class="required">*</span>
        </label>
        <input type="password" name="password" id="password" placeholder="Password" required>

        <button class="cspp">
            <i class="fa fa-check"></i>
            Submit!
        </button>
    </form>
{:else if form.status == 200}
    <h2 class="subtitle medium nogap">Clues</h2>
    <div class="list">
        <button class="button medium" on:click={() => clueAdd()}>
            <i class="fa fa-plus"></i>
            Add Clue
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Password</th>
                    <th>Next</th>
                    <th>UUID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each form.clues as clue}
                    <tr>
                        <td>{clue.name}</td>
                        <td>{clue.level}</td>
                        <td>{clue.password}</td>
                        <td>{clue.next}</td>
                        <td>{clue.uuid}</td>
                        <td>
                            <div class="actions">
                                <button class="action" on:click={() => clueView(clue.uuid)}><i class="fa fa-gear icon-center"></i></button>
                                <button class="action" on:click={() => clueRemove(clue.uuid)}><i class="fa fa-times icon-center"></i></button>
                            </div>
                        </td>
                    </tr>
                {/each}

                {#if form.clues.length == 0}
                    <tr>
                        <td colspan="6">No clues found.</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
{/if}