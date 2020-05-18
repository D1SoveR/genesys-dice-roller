import { createStore } from "redux";

type Redux<Payload> = {
    dispatch(arg: { type: "CHANGE", value: Payload }): void;
    subscribe(arg: () => void): () => void;
    getState(): { value: Payload };
}

class Settings<Payload> {

    constructor(name: string, initialValue?: Payload) {

        const savedValue: string | null = window.localStorage.getItem(name);
        if (savedValue) {
            initialValue = JSON.parse(savedValue).value;
        }

        this.name = name;
        this.store = createStore(this.reducer.bind(this), { value: initialValue });
    }

    readonly name: string;

    private store: Redux<Payload>;

    private subscriptions: Map<(p: Payload) => void, () => void> = new Map();

    protected reducer(state: { value: Payload }, action: { type?: "CHANGE", value: Payload }): { value: Payload } {
        if (action.type === "CHANGE" && action.value !== state.value) {
            const result = { value: action.value };
            window.localStorage.setItem(this.name, JSON.stringify(result));
            return result;
        }
        return state;
    }

    on(callback: (p: Payload) => void): void {
        const handler = () => callback(this.get());
        this.subscriptions.set(callback, this.store.subscribe(handler));
    }

    off(callback: (p: Payload) => void): void {
        const unsubscribe = this.subscriptions.get(callback);
        if (unsubscribe) {
            unsubscribe();
        }
    }

    get(): Payload {
        return this.store.getState().value;
    }

    set(value: Payload): void {
        this.store.dispatch({ type: "CHANGE", value });
    }
}

type ThemeOptions = "light" | "dark" | null;
const themeOptionList: ThemeOptions[] = ["light", "dark", null];

class ThemeSettings extends Settings<ThemeOptions> {

    constructor() {
        super("theme", null);
    }

    getClass(): NonNullable<ThemeOptions> {

        const selectedTheme = this.get();

        if (selectedTheme) {
            return selectedTheme;
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light";
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    }

    toggle(): void {
        const newThemeIndex = (themeOptionList.indexOf(this.get()) + 1) % themeOptionList.length;
        this.set(themeOptionList[newThemeIndex]);
    }
}

export const Theme = new ThemeSettings();
