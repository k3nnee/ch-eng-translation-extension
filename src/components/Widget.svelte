<script>
    import "bootstrap/dist/js/bootstrap";
    import translate_text from "../util/genai-util";
    import {writable} from "svelte/store";

    export let highlighted_text;
    let translated_text = writable("");
    let undo_text = writable("");

    const on_click = async () => {
        await translate_text($highlighted_text)
            .then((response) => {
                translated_text.set(response.translated_text)
                undo_text.set(response.text)
            });

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const new_node = document.createTextNode($translated_text);
        range.deleteContents();
        range.insertNode(new_node);
    }

    const undo_click = () => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const new_node = document.createTextNode($undo_text);
        range.deleteContents();
        range.insertNode(new_node);

        let placeholder = $translated_text;
        translated_text.set($undo_text);
        undo_text.set(placeholder);
    }
</script>

<main>
    <div class="d-flex bg-white rounded-2 px-2 shadow-sm">
        <button class = "btn bi bi-translate me-1 p-1" on:click={() => on_click()}>
        </button>
<!--        <button class = "btn bi bi-arrow-counterclockwise p-1" on:click={() => undo_click()}>-->
<!--        </button>-->
    </div>
</main>
