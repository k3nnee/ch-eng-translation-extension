import OpenAI from "openai"
import prompt from "./prompt.js";

const openai = new OpenAI({ apiKey: "edit_me", dangerouslyAllowBrowser: true});

const translate_text = async (text) => {
    console.log(text)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt },
            {
                role: "user",
                content: JSON.stringify(text),
            },
        ],
    });
    const message = completion.choices[0].message.content
    return JSON.parse(message);
}

export default translate_text;