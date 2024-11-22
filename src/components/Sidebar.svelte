<script>
    import {writable} from "svelte/store";
    import "../util/genai-util";
    import translate_text from "../util/genai-util.js";

    export let show;
    console.log($show)

    const window_x = window.innerWidth;
    const window_y = window.innerHeight;

    let language_1 = writable("Language");
    let language_2 = writable("Language");
    let text = writable("");
    let translated_text = writable("");

    const handle_click = async () => {
        await translate_text(`Can you convert the following text from ${$language_1} to ${$language_2}: ${$text}`)
            .then((response) => {
                translated_text.set(response.translated_text)
            });
        text.set("");
    }
</script>

{#if $show === true}
    <div class="h-100 container-fluid align-content-center me-2">
        <div class="w-100 h-75 rounded-2 bg-white shadow-sm">
            <div class = "d-flex justify-content-between align-content-center">
                <h4 class="m-1 p-2">
                    <strong>
                        Translate
                    </strong>
                </h4>
                <button class = "btn bi bi-arrows-angle-contract" on:click = {() => show.set(false)}></button>
            </div>
            <div class="card h-50 m-2">
                <div class="card-header d-flex justify-content-center">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {$language_1}
                        </button>
                        <ul class="dropdown-menu">
                            <li on:click={() => language_1.set("English")}>
                                <button class="btn w-100"> English</button>
                            </li>
                            <li on:click={() => language_1.set("Chinese")}>
                                <button class="btn w-100"> Chinese</button>
                            </li>
                        </ul>
                    </div>
                    <i class="bi bi-arrow-right align-content-center mx-2"></i>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {$language_2}
                        </button>
                        <ul class="dropdown-menu">
                            <li on:click={() => language_2.set("English")}>
                                <button class="btn w-100"> English</button>
                            </li>
                            <li on:click={() => language_2.set("Chinese")}>
                                <button class="btn w-100"> Chinese</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-body p-1">
                <textarea class="form-control" rows="6" placeholder="Enter your text here"
                          on:change={(e) => text.set(e.target.value)}></textarea>
                    <div class="w-100 d-flex justify-content-end mt-2">
                        <button on:click={() => handle_click()}
                                class="btn btn-outline-secondary p-1"> Translate
                        </button>
                    </div>
                </div>
            </div>
            <div class="card h-25 m-2">
                <div class="card-body p-2 overflow-y-auto">
                    {$translated_text}
                </div>
            </div>
        </div>
    </div>
{/if}
